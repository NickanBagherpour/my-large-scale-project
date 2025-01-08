import { useMutation } from '@tanstack/react-query';

import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { queryClient } from '@oxygen/client';

export const useDeleteUpstream = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params) => Api.deleteUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.UPSTREAM_LIST.GET_LIST],
      });
    },
    networkMode: 'offlineFirst',
  });
};
