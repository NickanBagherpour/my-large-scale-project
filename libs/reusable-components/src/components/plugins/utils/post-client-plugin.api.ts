import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ClientPluginParams } from './plugins.type';
import { type Dispatch } from 'react';

export const useClientPluginMutation = (dispatch: Dispatch<any>) => {
  return useMutation({
    mutationFn: (params: ClientPluginParams) => Api.postClientConfig(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
