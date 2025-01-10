import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@oxygen/utils';

import { updateMessageAction, useAppDispatch } from '../context';

import Api from './api';
import { Nullable } from '@oxygen/types';
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
  return useMutation({
    mutationFn: (params: EditRouteParams) => Api.editRoute(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },

    networkMode: 'offlineFirst',
  });
};
