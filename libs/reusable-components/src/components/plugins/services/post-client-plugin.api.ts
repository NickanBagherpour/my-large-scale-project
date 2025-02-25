import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { type Dispatch } from 'react';
import { type ClientPluginParams } from '../types/plugins.type';

export const useClientPluginMutation = (dispatch: Dispatch<any>) => {
  return useMutation({
    mutationFn: (params: ClientPluginParams) => Api.postClientConfig(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
