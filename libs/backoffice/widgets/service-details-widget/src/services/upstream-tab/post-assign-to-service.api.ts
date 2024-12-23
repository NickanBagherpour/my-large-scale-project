import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../../context';

import Api from '../api';
export type AssignUpstreamToServiceParams = { id: string | number; serviceName: string };
export const useAssignToServiceMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: AssignUpstreamToServiceParams) => Api.assignToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
