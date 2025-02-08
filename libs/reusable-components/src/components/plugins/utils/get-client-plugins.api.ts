import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';

const { PLUGINS } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const getPluginKeys = (name: string) => [PLUGINS, name];

export const useClientPlugins = (name: string) => {
  // const dispatch = useAppDispatch();
  return useQuery({
    queryKey: getPluginKeys(name),
    queryFn: withErrorHandling(() => Api.getClientPlugins(name) /* dispatch */),
  });
};
