import { useMutation } from '@tanstack/react-query';
import { ApiUtil } from '@oxygen/utils';

import Api from './api';
import { useAppDispatch } from '../context';

export const useRegisterMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.postRegisterUser(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
  });
};
