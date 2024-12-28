import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { FetchSubmissionDetailParamsType } from '../types';

export const useGetRequestResultQuery = (params: FetchSubmissionDetailParamsType): any => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.REQUEST_DETAILS.GET_REQUEST_RESULT, params],
    queryFn: withErrorHandling(() => Api.getRequestResult(params), dispatch),
    enabled: !!params.submissionId,
  });
};
