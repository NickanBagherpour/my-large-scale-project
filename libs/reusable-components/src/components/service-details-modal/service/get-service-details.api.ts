import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { type Dispatch } from 'react';

const { CLIENT_DETAILS, SERVICE } = RQKEYS.BACKOFFICE;

export const useGetServiceDetails = (serviceName: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: [SERVICE, CLIENT_DETAILS.SERVICE, serviceName],
    enabled: !!serviceName,
    queryFn: withErrorHandling(() => Api.getServiceDetails(serviceName), dispatch),
  });
};
