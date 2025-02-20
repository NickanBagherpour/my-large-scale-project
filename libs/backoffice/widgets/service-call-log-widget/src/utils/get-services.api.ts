import { useInfiniteQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../services/api';
import { type Dispatch } from 'react';
import { SERVICE_DEFAULTS } from './consts';

const { CLIENT_DETAILS, SERVICE } = RQKEYS.BACKOFFICE;

export const useGetServices = (searchTerm: string, dispatch: Dispatch<any>) => {
  return useInfiniteQuery({
    queryKey: [SERVICE, CLIENT_DETAILS.SERVICES, searchTerm],
    queryFn: ({ pageParam }) =>
      withErrorHandling(
        () =>
          Api.getServices({
            'search-field': searchTerm,
            page: pageParam,
            ...SERVICE_DEFAULTS,
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
