import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../services/api';
import { type Dispatch } from 'react';

const { CLIENT, CLIENTS_LIST } = RQKEYS.BACKOFFICE;

export const useGetClientsQuery = (searchTerm: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: [CLIENT, CLIENTS_LIST.CLIENTS, searchTerm],
    queryFn: ({ pageParam }) =>
      withErrorHandling(
        () =>
          Api.getClientsListData({
            searchParam: searchTerm,
          }),
        dispatch
      )(),
  });
};
