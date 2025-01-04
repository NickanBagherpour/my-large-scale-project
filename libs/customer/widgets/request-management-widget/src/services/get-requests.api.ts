import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { RequestParamsType } from '@oxygen/types';

export const useGetRequestsQuery = (params: RequestParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CLIENTS_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getRequestsListData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetRequestsDraftsQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CLIENTS_LIST.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRequestDraftListData(), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteSelectedRequestsDraftsMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (submissionId: number) => Api.deleteSelectedRequest(submissionId),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
