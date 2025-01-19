import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { withErrorHandling } from '@oxygen/utils';
import { DifferenceMap, Props } from './types';
import { api } from './api';

function calculateDifference<ObjectType extends object>(
  baseObject: ObjectType,
  comparisonObject: ObjectType
): DifferenceMap<ObjectType> {
  return Object.entries(baseObject).reduce((result, [key, value]) => {
    const computedDifference =
      value !== null && typeof value === 'object' ? calculateDifference(value, comparisonObject?.[key]) : value;

    return {
      ...result,
      [key]: {
        originalValue: computedDifference,
        hasDifference: comparisonObject ? comparisonObject[key] !== value : false,
      },
    };
  }, {} as DifferenceMap<ObjectType>);
}

export function useChangeHistoryQuery<TContentItem extends object>(props: Props) {
  const {
    queryKey,
    url,
    params,
    params: { size, page },
    dispatch,
  } = props;

  const nextItemParams = { page: page * size + size, size: 1 };

  const { data: currentPageData, isFetching: isFetchingCurrentPage } = useQuery({
    queryKey: [...queryKey, params],
    queryFn: withErrorHandling(() => api.getList<TContentItem>({ url, params }), dispatch),
    placeholderData: keepPreviousData,
  });

  const { data: nextItemData, isFetching: isFetchingPreviousItem } = useQuery({
    queryKey: [...queryKey, nextItemParams],
    queryFn: withErrorHandling(() => api.getList<TContentItem>({ url, params: nextItemParams }), dispatch),
  });

  const isFetching = isFetchingCurrentPage || isFetchingPreviousItem;

  if (currentPageData && nextItemData) {
    const combinedData = [...currentPageData.content, ...nextItemData.content];

    // TODO: cache this computaion
    const diffAnnotatedData = combinedData.map((item, index, arr) =>
      calculateDifference<TContentItem>(item, arr[index + 1])
    );

    if (nextItemData.content.length) {
      diffAnnotatedData.pop();
    }

    return {
      data: { ...currentPageData, content: diffAnnotatedData },
      isFetching,
    };
  }

  return {
    data: undefined,
    isFetching,
  };
}
