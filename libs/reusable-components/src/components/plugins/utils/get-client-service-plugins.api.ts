import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';

const { SERVICES } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const getServiceKeys = (clientName: string) => [SERVICES, clientName];

export const useClientServicePlugins = (name: string) => {
  // const dispatch = useAppDispatch();
  return useQuery({
    queryKey: getServiceKeys(name),
    queryFn: withErrorHandling(() => Api.getClientServicePlugins(name) /* dispatch */),
  });
};
