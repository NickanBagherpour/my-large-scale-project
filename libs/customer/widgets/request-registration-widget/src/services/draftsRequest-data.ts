import { SubmissionId } from './../../../../../business/widgets/request-details-widget/src/types/get-submission-detail.type';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetRequestQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICES_LIST.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRequestData(), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetRequestDataQuery = (submissionId: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.REQUEST_REGISTRATION.GET_REQUEST_DATA],
    queryFn: withErrorHandling(() => Api.geRequestData(submissionId), dispatch),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    staleTime: 0,
  });
};

export const useGetRequestDataFromDraftsMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (SubmissionId: string | null) => Api.getRequestDataFromDrafts(SubmissionId),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
