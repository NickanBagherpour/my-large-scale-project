import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GeneralInfoParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

export const usePostGeneralInfoMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: GeneralInfoParams) => Api.postGeneralInfo(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.SERVICE_CREATION.SERVICE, serviceName] });
    },
  });
};
