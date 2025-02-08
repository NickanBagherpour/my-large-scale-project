import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetClientInfoQuery = (clientName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_PROFILE, RQKEYS.BACKOFFICE.CLIENT_DETAILS.CLIENT_INFO],
    queryFn: withErrorHandling(() => Api.getClientInfo(clientName), dispatch),
  });
};
