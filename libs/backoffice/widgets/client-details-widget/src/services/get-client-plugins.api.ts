import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

const { CLIENT_PLUGINS } = RQKEYS.BACKOFFICE.CLIENTS_LIST;

export const useClientPlugins = (name: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [CLIENT_PLUGINS],
    queryFn: withErrorHandling(() => Api.getClientPlugins(name), dispatch),
  });
};
