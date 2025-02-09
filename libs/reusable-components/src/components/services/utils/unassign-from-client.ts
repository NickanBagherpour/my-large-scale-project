import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { ServiceToClientParams } from './services.type';
import { type Dispatch } from 'react';

const { CLIENT_SERVICES, PLUGINS } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const useUnassignServiceFromClient = (dispatch: Dispatch<any>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ServiceToClientParams) => Api.deleteUnassignServiceFromClient(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [CLIENT_SERVICES] });
      await queryClient.invalidateQueries({ queryKey: [PLUGINS] });
    },
  });
};
