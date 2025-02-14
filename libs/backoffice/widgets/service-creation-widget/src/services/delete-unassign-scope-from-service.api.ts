import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scopeToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { SERVICE, SERVICE_CREATION, SCOPE, SERVICES_LIST } = RQKEYS.BACKOFFICE;

export const useDeleteUnassignFromService = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: scopeToServiceParams) => Api.deleteUnassignScopeFromService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [SCOPE, SERVICE_CREATION.SCOPE, serviceName],
        refetchType: 'active',
      });
      await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST.DRAFTS], refetchType: 'none' });
      await queryClient.invalidateQueries({ queryKey: [SERVICE], refetchType: 'none' });
      await queryClient.invalidateQueries({ queryKey: [SCOPE], refetchType: 'none' });
    },
  });
};
