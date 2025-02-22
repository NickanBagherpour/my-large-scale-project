import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { convertApi } from '../utils/helper';

export const useGetClientInfo = (reqId) => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.EDIT_APPLICANT_INFO.CLIENT_INFO],
    queryFn: withErrorHandling(() => Api.getClientInfo(reqId), dispatch),
    enabled: !!reqId,
    select: (data) => convertApi(data),
    networkMode: 'offlineFirst',
  });
};
