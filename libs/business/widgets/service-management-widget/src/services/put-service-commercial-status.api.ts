import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@oxygen/client';

export const usePutServiceCommercialStatusMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (serviceName: string) => Api.putServiceCommercialStatus(serviceName),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.BUSINESS.BUSINESS_SERVICE_MANAGEMENT.GET_TABLE],
        // refetchType: 'none',
      });
    },
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
