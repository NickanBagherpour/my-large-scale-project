import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ServiceToClientParams } from './services.type';
import { type Dispatch } from 'react';
import { getClientServicesKeys } from './get-client-services.api';
import { getServicePluginKeys } from '../../plugins/utils/get-client-service-plugins.api';

export const useAssignServiceToClient = (dispatch: Dispatch<any>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ServiceToClientParams) => Api.postAssignServiceToClient(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: getClientServicesKeys() });
      await queryClient.invalidateQueries({ queryKey: getServicePluginKeys('').slice(0, 2) });
    },
  });
};
