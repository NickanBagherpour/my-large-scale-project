import { AxiosResponse } from 'axios';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import Api from './api';

export const useUploadServiceMutation = (onSuccess: () => void) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceName: string) => Api.uploadService(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.SERVICES_LIST.DRAFTS], refetchType: 'none' });
      onSuccess();
    },
  });
};
