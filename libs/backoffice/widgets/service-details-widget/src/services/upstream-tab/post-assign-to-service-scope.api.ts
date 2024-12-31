import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../../context';

import Api from '../api';
import { Nullable } from '@oxygen/types';
export type AssignScopeToServiceParams = { id: Nullable<string | number>; serviceName: Nullable<string> };
export const useAssignToServiceScopeMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: AssignScopeToServiceParams) => Api.assignToServiceScope(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    networkMode: 'offlineFirst',
  });
};
