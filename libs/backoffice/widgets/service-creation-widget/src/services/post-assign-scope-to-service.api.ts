import { useMutation } from '@tanstack/react-query';
import { AssignScopeToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostAssignScopeToService = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: AssignScopeToServiceParams) => Api.postAssignScopeToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
