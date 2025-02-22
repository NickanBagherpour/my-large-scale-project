import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ServicePluginParams } from './plugins.type';
import { type Dispatch } from 'react';

export const useServiceMutaionMutation = (dispatch: Dispatch<any>) => {
  return useMutation({
    mutationFn: (params: ServicePluginParams) => Api.postServiceConfig(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
