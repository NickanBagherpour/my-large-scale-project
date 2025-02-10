import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { type Dispatch } from 'react';

const { PLUGINS } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const getPluginKeys = (name: string) => [PLUGINS, name];

export const useClientPlugins = (name: string, dispatch: Dispatch<any>) => {
  return useQuery({
    queryKey: getPluginKeys(name),
    queryFn: withErrorHandling(() => Api.getClientPlugins(name), dispatch),
  });
};
