import { withErrorHandling } from '@oxygen/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';
import Api from '../api';
import { useAppDispatch } from '../../context';

const PAGE_SIZE = 10;
const SORT = 'createDate,DESC';

export const useGetClientService = (query: string) => {
  const dispatch = useAppDispatch();

  return useInfiniteQuery({
    queryKey: [RQKEYS.REUSABLE_COMPONENTS.CLIENT_SERVICES, query],
    queryFn: ({ pageParam }) =>
      withErrorHandling(
        () =>
          Api.getClientService({
            query,
            page: pageParam,
            size: PAGE_SIZE,
            sort: SORT,
          }),
        dispatch
      )(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage.page;
      const isLastPage = number + 1 >= totalPages;

      if (isLastPage) return null;
      else return number + 1;
    },
  });
};
