import { type Dispatch } from 'react';

import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from './api';

const { CLIENT_DETAILS, SERVICE } = RQKEYS.BACKOFFICE;

export const useGetServiceClients = (serviceName: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: [SERVICE, CLIENT_DETAILS.SERVICE, serviceName],
    queryFn: withErrorHandling(() => Api.getServiceClients(serviceName), dispatch),
    enabled: !!serviceName,
  });
};
