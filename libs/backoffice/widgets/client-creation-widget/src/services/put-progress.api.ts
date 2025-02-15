import { ApiUtil, RQKEYS, withErrorHandling } from '@oxygen/utils';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@oxygen/client';

type ProgressQueryParams = {
  clientName: string;
  progressCode: number;
};
export const usePutProgressQuery = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: ProgressQueryParams) => Api.putProgress(params),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.CLIENT_DRAFT_INFO],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.INQUIRY_STATUS],
        refetchType: 'none',
      });
    },
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
  });
};
