import { updateMessageAction, useAppDispatch } from '../context';
import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { CreateUpstreamParamsType } from '../types';

export const useCreateUpstreamMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: CreateUpstreamParamsType) => Api.postCreateUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },

    networkMode: 'offlineFirst',
  });
};
