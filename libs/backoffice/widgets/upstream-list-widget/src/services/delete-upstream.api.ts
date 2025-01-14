import { useMutation } from '@tanstack/react-query';

import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';

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
        queryKey: [RQKEYS.UPSTREAM_LIST.GET_LIST, RQKEYS.UPSTREAM_LIST.GET_UPSTREAM_SERVICES],
      });

      await queryClient.refetchQueries({
        queryKey: [RQKEYS.UPSTREAM_LIST.GET_LIST],
      });
    },
    networkMode: 'offlineFirst',
  });
};
