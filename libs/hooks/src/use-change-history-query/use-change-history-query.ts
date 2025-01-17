import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { withErrorHandling } from '@oxygen/utils';
import { Props } from './types';
import { api } from './api';

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
    queryFn: withErrorHandling(() => api.getList<TContentItem[]>({ url, params }), dispatch),
    placeholderData: keepPreviousData,
  });

  const { data: nextItemData, isFetching: isFetchingPreviousItem } = useQuery({
    queryKey: [...queryKey, nextItemParams],
    queryFn: withErrorHandling(() => api.getList<TContentItem[]>({ url, params: nextItemParams }), dispatch),
  });

  const isFetching = isFetchingCurrentPage || isFetchingPreviousItem;

  if (currentPageData && nextItemData) {
    const combinedData = [...currentPageData.content, ...nextItemData.content];

    const diffAnnotatedData = combinedData.map((item, index) =>
      Object.entries(item).reduce((acc, [key, value]) => {
        const nextItem = combinedData[index + 1];
        const isDifferent = nextItem ? nextItem[key] !== value : false;
        return {
          ...acc,
          [key]: { isDifferent, value },
        };
      }, {} as { [K in keyof TContentItem]: { isDifferent: boolean; value: TContentItem[K] } })
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
