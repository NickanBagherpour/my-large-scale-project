import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { withErrorHandling } from '@oxygen/utils';
import { Props } from './types';
import { api } from './api';

type DiffedItems<T extends object> = {
  [K in keyof T]: { value: T[K] extends object ? DiffedItems<T[K]> : T[K]; isDifferent: boolean };
};

function getDiff<T extends object>(one: T, two: T): DiffedItems<T> {
  return Object.entries(one).reduce((acc, [key, value]) => {
    const val = value !== null && typeof value === 'object' ? getDiff(value, two?.[key]) : value;
    return {
      ...acc,
      [key]: {
        value: val,
        isDifferent: two ? two[key] !== value : false,
      },
    };
  }, {} as DiffedItems<T>);
}

export default function useChangeHistoryQuery<TContentItem extends object>(props: Props) {
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
    const diffAnnotatedData = combinedData.map((item, index, arr) => getDiff<TContentItem>(item, arr[index + 1]));

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
