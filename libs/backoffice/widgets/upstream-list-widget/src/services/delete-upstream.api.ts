import { useMutation } from '@tanstack/react-query';

import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';

export const useDeleteUpstream = () => {
  const dispatch = useAppDispatch();
  const {
    UPSTREAM,
    UPSTREAM_LIST: { GET_UPSTREAM_SERVICES, GET_LIST },
  } = RQKEYS.BACKOFFICE;
  return useMutation({
    mutationFn: (params) => Api.deleteUpstream(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [UPSTREAM],
      });
      await queryClient.invalidateQueries({
        queryKey: [GET_UPSTREAM_SERVICES],
        refetchType: 'none',
      });
    },
    networkMode: 'offlineFirst',
  });
};
