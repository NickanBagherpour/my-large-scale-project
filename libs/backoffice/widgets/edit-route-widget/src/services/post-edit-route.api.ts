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
      console.log('Error received in onError:', e);
      const err = ApiUtil.getErrorMessage(e);
      console.log('Processed error message:', err.description);
      updateMessageAction(dispatch, err.description);
    },

    networkMode: 'offlineFirst',
  });
};
