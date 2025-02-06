import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

const { CLIENT_DETAILS } = RQKEYS.BACKOFFICE;

export const useGetClientTypeQuery = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [CLIENT_DETAILS.CLIENT_TYPES],
    queryFn: withErrorHandling(() => Api.getClientTypes(), dispatch),
  });
};
