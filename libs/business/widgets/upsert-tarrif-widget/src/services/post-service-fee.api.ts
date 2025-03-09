import { useMutation } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { PostTariffParams } from '../types';
import { ApiUtil } from '@oxygen/utils';

export const usePostServiceFee = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: PostTariffParams) => Api.postServiceFee(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
