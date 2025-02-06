import { useMutation } from '@tanstack/react-query';
// import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ServiceToClientParams } from './services.type';

export const useAssignServiceToClient = () => {
  // const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: ServiceToClientParams) => Api.postAssignServiceToClient(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      // updateMessageAction(dispatch, err);
    },
  });
};
