import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import Api from '../api';
import { updateMessageAction, useAppDispatch } from '../../context';

export const usePostSubmitClient = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params) => Api.postClient(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
