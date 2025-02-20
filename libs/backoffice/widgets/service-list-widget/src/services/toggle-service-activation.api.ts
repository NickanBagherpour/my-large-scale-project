import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import Api from './api';
import { ToggleActivationParams } from '../types/toggle-status.type';

export const useToggleServiceAtivationMutation = (onSuccess: () => void) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ToggleActivationParams) => Api.toggleStatus(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.BACKOFFICE.SERVICE, RQKEYS.BACKOFFICE.SERVICES_LIST.GET_LIST],
        exact: false,
      });
      onSuccess();
    },
  });
};
