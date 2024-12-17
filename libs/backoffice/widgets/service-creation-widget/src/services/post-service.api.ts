import { useMutation } from '@tanstack/react-query';
import { PostServiceParams } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostServiceMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: PostServiceParams) => Api.postService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
