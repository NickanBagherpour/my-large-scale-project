import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignScopeToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

export const usePostAssignScopeToService = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: AssignScopeToServiceParams) => Api.postAssignScopeToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.BACKOFFICE.SERVICE_CREATION.SCOPE, serviceName],
        refetchType: 'active',
      });
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.SERVICES_LIST.DRAFTS], refetchType: 'none' });
    },
  });
};
