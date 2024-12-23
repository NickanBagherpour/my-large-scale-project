import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { FetchRequestDetailParamsType } from '../types';

export const useGetRequestResultQuery = (params: FetchRequestDetailParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_RESULT],
    queryFn: withErrorHandling(() => Api.getRequestResult(params), dispatch),
  });
};
