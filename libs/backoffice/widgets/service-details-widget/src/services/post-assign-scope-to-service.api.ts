import { useMutation } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

export const usePostAssignScopeToService = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: any) => Api.postAssignScopeToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
