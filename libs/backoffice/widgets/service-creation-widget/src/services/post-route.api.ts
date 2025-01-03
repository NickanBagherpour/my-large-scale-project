import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

export const usePostRouteMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: RouteParams) => Api.postRoute(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.SERVICE_CREATION.ROUTE, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.SERVICES_LIST.DRAFTS], refetchType: 'none' });
    },
  });
};
