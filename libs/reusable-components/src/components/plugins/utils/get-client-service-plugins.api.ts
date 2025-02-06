import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
// import { useAppDispatch } from '../context';
import Api from './api';

const { CLIENT_SERVICE_PLUGINS } = RQKEYS.BACKOFFICE.CLIENTS_LIST;

export const useClientServicePlugins = (name: string) => {
  // const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [CLIENT_SERVICE_PLUGINS, name],
    queryFn: withErrorHandling(() => Api.getClientServicePlugins(name) /* dispatch */),
  });
};
