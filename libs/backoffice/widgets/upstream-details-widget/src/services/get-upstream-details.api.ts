import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { EditUpstreamParamsType } from '../types';

export const useGetUpstreamDetailsQuery = (upstreamName: string | null) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_DETAILS.GET_LIST, upstreamName],
    queryFn: withErrorHandling(() => Api.getUpstreamDetailsList(upstreamName), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useAddServerToUpstreamMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.addServerToUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      // dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};

export const useDeleteServerFromUpstreamMutationQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.deleteServerFromUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};

export const useEditUpstreamMutation = () => {
  return useMutation({
    mutationFn: (params: EditUpstreamParamsType) => Api.putEditUpstream(params),
    networkMode: 'offlineFirst',
  });
};
