import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const backofficeKey = RQKEYS.BACKOFFICE;
export const useGetClientsQuery = (serviceName?: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [backofficeKey.SERVICE, backofficeKey.SERVICES_LIST.CLIENTS, serviceName],
    queryFn: withErrorHandling(() => Api.getClients(serviceName), dispatch),
    enabled: !serviceName,
    placeholderData: keepPreviousData,
  });
};
