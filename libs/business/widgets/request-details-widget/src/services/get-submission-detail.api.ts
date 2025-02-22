import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { FetchSubmissionDetailParamsType } from '../types';

export const useGetSubmissionDetailQuery = (params: FetchSubmissionDetailParamsType) => {
  const dispatch = useAppDispatch();
  const {
    REQUEST,
    REQUEST_DETAILS: { GET_REQUEST_DETAIL },
  } = RQKEYS.BUSINESS;
  return useQuery({
    queryKey: [REQUEST, GET_REQUEST_DETAIL, params],
    queryFn: withErrorHandling(() => Api.getSubmissionDetail(params), dispatch),
    enabled: !!params.submissionId,
  });
};
