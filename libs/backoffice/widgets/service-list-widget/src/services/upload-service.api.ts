import { ApiUtil } from '@oxygen/utils';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import Api from './api';

export const useUploadServiceMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (serviceName: string) => Api.uploadService(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
