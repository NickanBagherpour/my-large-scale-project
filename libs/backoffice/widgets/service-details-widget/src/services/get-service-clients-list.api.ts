import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
// import { GrantType } from '../types';

export const useGetServiceClientsListQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_CLIENTS_LIST.GET_LIST],
    queryFn: withErrorHandling(() => Api.getServiceClientsList(), dispatch),
  });
};
