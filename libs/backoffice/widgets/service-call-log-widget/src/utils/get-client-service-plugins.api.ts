import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from '../services/api';
import { type Dispatch } from 'react';

const {
  SERVICE,
  CLIENT_DETAILS: { SERVICES },
} = RQKEYS.BACKOFFICE;

export const getServicePluginKeys = (clientName: string) => [SERVICE, SERVICES, clientName];

export const useClientServicePlugins = (name: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: getServicePluginKeys(name),
    queryFn: withErrorHandling(() => Api.getClientServicePlugins(name), dispatch),
  });
};
