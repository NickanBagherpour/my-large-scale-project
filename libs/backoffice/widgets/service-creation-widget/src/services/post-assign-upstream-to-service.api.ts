import { useMutation } from '@tanstack/react-query';
import { AssignUpstreamToServiceParams } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';

export const usePostAssignUpstreamToService = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: AssignUpstreamToServiceParams) => Api.postAssignUpstreamToService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
