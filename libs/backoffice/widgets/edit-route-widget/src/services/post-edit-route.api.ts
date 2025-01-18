import { useMutation } from '@tanstack/react-query';

import { ApiUtil, RQKEYS } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../context';

import Api from './api';
import { queryClient } from '@oxygen/client';
export type EditRouteParams = {
  method: {
    code: any;
    title: any;
  };
  protocol: {
    code: any;
    title: any;
  };
  path: any;
  host: any;
};
export const useEditRouteMutation = () => {
  const dispatch = useAppDispatch();
  const { SERVICE, ROUTE_DETAILS } = RQKEYS.BACKOFFICE;

  return useMutation({
    mutationFn: (params: EditRouteParams) => Api.editRoute(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [SERVICE, ROUTE_DETAILS.GET_LIST], refetchType: 'active' });
    },
  });
};
