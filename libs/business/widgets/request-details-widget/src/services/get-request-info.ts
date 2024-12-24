import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { FetchRequestDetailParamsType } from '../types';

export const useGetRequestInfoQuery = (params: FetchRequestDetailParamsType): any => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_INFO, params],
    queryFn: withErrorHandling(() => Api.getRequestInfo(params), dispatch),
    enabled: !!params.requestId,
  });
};
