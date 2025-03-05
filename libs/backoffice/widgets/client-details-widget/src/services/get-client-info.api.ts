import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

const { CLIENT_PROFILE, CLIENT_DETAILS } = RQKEYS.BACKOFFICE;

export const useGetClientInfoQuery = (clientName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [CLIENT_PROFILE, CLIENT_DETAILS.CLIENT_INFO, clientName],
    queryFn: withErrorHandling(() => Api.getClientInfo(clientName), dispatch),
  });
};
