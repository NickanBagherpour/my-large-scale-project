import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { CreateUpstreamParamsType } from '../types';
import { ApiUtil } from '@oxygen/utils';
import { updateErrorMessageAction, updateMessageAction, useAppDispatch } from '../context';

export const useCreateUpstreamMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: CreateUpstreamParamsType) => Api.postCreateUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateErrorMessageAction(dispatch, err);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
