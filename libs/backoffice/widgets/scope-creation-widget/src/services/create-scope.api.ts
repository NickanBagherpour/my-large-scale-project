import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../context';

import Api from './api';
import { CreateScopeType } from '../types';

export const useCreateScope = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: CreateScopeType) => Api.createScope(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
