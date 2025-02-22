import { useInfiniteQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { SCOPE_PAGE_SIZE } from '../utils/consts';

const { SCOPE, SERVICE_CREATION } = RQKEYS.BACKOFFICE;

export const useGetScopes = (searchTerm: string) => {
  const dispatch = useAppDispatch();
  return useInfiniteQuery({
    queryKey: [SCOPE, SERVICE_CREATION.SCOPES, searchTerm],
    queryFn: ({ pageParam }) =>
      withErrorHandling(
        () =>
          Api.getScopes({
            'search-field': searchTerm,
            size: SCOPE_PAGE_SIZE,
            sort: 'createDate,DESC',
            page: pageParam,
          }),
        dispatch
      )(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return null;
      else return lastPage.pageable.pageNumber + 1;
    },
  });
};
