import { useMutation } from '@tanstack/react-query';
import { GeneralInfoParams } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostGeneralInfoMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: GeneralInfoParams) => Api.postGeneralInfo(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
