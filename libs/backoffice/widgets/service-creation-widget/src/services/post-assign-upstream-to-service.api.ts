import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignUpstreamToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

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
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.SERVICE_CREATION.UPSTREAM, serviceName] });
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.SERVICES_LIST.DRAFTS] });
    },
  });
};
