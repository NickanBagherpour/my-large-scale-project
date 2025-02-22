import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ClientsParams } from '../types';

const { CLIENT, CLIENTS_LIST } = RQKEYS.BACKOFFICE;

export const useGetClientsQuery = (params: ClientsParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [CLIENT, CLIENTS_LIST.CLIENTS, params],
    queryFn: withErrorHandling(() => Api.getClientsListData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
