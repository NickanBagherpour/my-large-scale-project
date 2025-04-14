import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetServiceClientsQuery = (serviceName: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.BUSINESS_SERVICE_MANAGEMENT.GET_SERVICE_CLIENTS, serviceName],
    queryFn: withErrorHandling(() => Api.getServiceClients(serviceName), dispatch),
    enabled: false,
  });
};
