import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { SERVICE, SERVICE_CREATION, SERVICES_LIST, SCOPE } = RQKEYS.BACKOFFICE;

export const usePostRegisterToSso = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (serviceName: string) => Api.postRegisterToSso(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_CREATION.ROUTE, serviceName] });
      await queryClient.invalidateQueries({
        queryKey: [SCOPE, SERVICE_CREATION.SCOPE, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({ queryKey: [SERVICE] });
      await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST] });
    },
  });
};
