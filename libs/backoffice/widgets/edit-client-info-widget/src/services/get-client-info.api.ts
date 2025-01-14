import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetClientInfo = (reqId) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_APPLICANT_INFO.CLIENT_INFO],
    queryFn: withErrorHandling(() => Api.getClientInfo(reqId), dispatch),
  });
};
