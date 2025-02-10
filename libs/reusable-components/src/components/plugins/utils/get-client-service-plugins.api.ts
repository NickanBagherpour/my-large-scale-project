import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type Dispatch } from 'react';

const { SERVICES } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const getServiceKeys = (clientName: string) => [SERVICES, clientName];

export const useClientServicePlugins = (name: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: getServiceKeys(name),
    queryFn: withErrorHandling(() => Api.getClientServicePlugins(name), dispatch),
  });
};
