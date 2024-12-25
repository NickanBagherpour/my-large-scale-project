import { useMutation } from '@tanstack/react-query';
import { RouteParams } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostRouteMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: RouteParams) => Api.postRoute(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
