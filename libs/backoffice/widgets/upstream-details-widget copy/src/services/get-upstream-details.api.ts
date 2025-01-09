import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamDetailsQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.UPSTREAM_DETAILS.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamDetailsList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useFirstStepUpstreamInfoRegistrationMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.upstreamInfoRegistrationFirstStep(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};

export const useAddServerMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.addServer(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
