import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { deepCopy, withErrorHandling } from '@oxygen/utils';
import { DifferenceMap, Props } from './types';
import { api } from './api';
import { cache } from 'react';

const calculateDifference = cache(function calculateDifference<ObjectType extends object>(
  baseObject: ObjectType,
  comparisonObject: ObjectType
): DifferenceMap<ObjectType> {
  return Object.entries(baseObject).reduce((result, [key, value]) => {
    const isObject = value !== null && typeof value === 'object';

    if (Array.isArray(value)) {
      return {
        ...result,
        [key]: {
          value,
          hasDifference: comparisonObject
            ? JSON.stringify(comparisonObject?.[key]?.map((item) => JSON.stringify(item)).sort()) !==
              JSON.stringify(value.map((item) => JSON.stringify(item)).sort())
            : false,
        },
      };
    }

    if (isObject) {
      return {
        ...result,
        [key]: calculateDifference(value, comparisonObject?.[key]),
      };
    }

    return {
      ...result,
      [key]: {
        value,
        hasDifference: comparisonObject ? comparisonObject[key] !== value : false,
      },
    };
  }, {} as DifferenceMap<ObjectType>);
});

export function useChangeHistoryQuery<TContentItem extends object>(props: Props<TContentItem>) {
  const {
    queryKey,
    url,
    params,
    params: { size, page, sortBy },
    dispatch,
    normalizer,
    nestedKeyAccessor,
  } = props;

  const nextItemParams = { page: page * size + size, size: 1, sortBy };

  const { data: currentPageData, isFetching: isFetchingCurrentPage } = useQuery({
    queryKey: [...queryKey, params],
    queryFn: withErrorHandling(() => api.getList<TContentItem>({ url, params }), dispatch),
    select: normalizer,
    placeholderData: keepPreviousData,
  });

  const current = nestedKeyAccessor ? currentPageData?.[nestedKeyAccessor] : currentPageData;

  const enableNextItemQuery = !!current && !current.empty && !current.last;

  const { data: nextItemData, isFetching: isFetchingPreviousItem } = useQuery({
    queryKey: [...queryKey, nextItemParams],
    queryFn: withErrorHandling(() => api.getList<TContentItem>({ url, params: nextItemParams }), dispatch),
    select: normalizer,
    enabled: enableNextItemQuery,
  });

  const next = nestedKeyAccessor ? nextItemData?.[nestedKeyAccessor] : nextItemData;
  const isFetching = isFetchingCurrentPage || isFetchingPreviousItem;

  if (current && (next || !enableNextItemQuery)) {
    const combinedData = [...current.content, ...(next?.content ?? [])];

    const diffAnnotatedData = combinedData.map((item, index, arr) =>
      calculateDifference<TContentItem>(item, arr[index + 1])
    );

    if (next?.content.length) {
      diffAnnotatedData.pop();
    }

    if (nestedKeyAccessor) {
      const clonedCurrentPageData = deepCopy(currentPageData);
      delete clonedCurrentPageData[nestedKeyAccessor];
      const { content, ...rest } = current;
      return {
        data: { ...clonedCurrentPageData, ...rest, content: diffAnnotatedData },
        isFetching,
      };
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
