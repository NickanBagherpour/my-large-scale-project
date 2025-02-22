import { useMutation } from '@tanstack/react-query';
import Api from './api';

import { ApiUtil } from '@oxygen/utils';

import { CreateUpstreamParamsType } from '../types';
import { updateErrorMessageAction, useAppDispatch } from '../context';

export const useCreateUpstreamMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: CreateUpstreamParamsType) => Api.postCreateUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateErrorMessageAction(dispatch, err);
      // updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
