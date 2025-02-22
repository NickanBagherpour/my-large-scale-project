import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignUpstreamToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { SERVICE, SERVICE_CREATION, SERVICES_LIST, UPSTREAM } = RQKEYS.BACKOFFICE;

export const usePostAssignUpstreamToService = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: AssignUpstreamToServiceParams) => Api.postAssignUpstreamToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [UPSTREAM, SERVICE_CREATION.UPSTREAM, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST.DRAFTS], refetchType: 'none' });
      await queryClient.invalidateQueries({ queryKey: [SERVICE], refetchType: 'none' });
    },
  });
};
