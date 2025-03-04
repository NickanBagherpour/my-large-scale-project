import { useInfiniteQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../services/api';
import { type Dispatch } from 'react';
import { CLIENT_DEFAULTS, SERVICE_DEFAULTS } from './consts';

const { CLIENT, CLIENTS_LIST } = RQKEYS.BACKOFFICE;

export const useGetClientsQuery = (searchTerm: string, dispatch: Dispatch<any>) => {
  return useInfiniteQuery({
    queryKey: [CLIENT, CLIENTS_LIST.CLIENTS, searchTerm],
    queryFn: ({ pageParam }) =>
      withErrorHandling(
        () =>
          Api.getClientsListData({
            searchParam: searchTerm,
            page: pageParam,
            ...CLIENT_DEFAULTS,
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
