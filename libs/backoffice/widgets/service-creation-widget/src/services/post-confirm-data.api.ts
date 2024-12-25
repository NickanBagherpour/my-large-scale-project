import { useMutation } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostConfirmData = () => {
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  return useMutation({
    mutationFn: () => Api.postCofirmData(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
