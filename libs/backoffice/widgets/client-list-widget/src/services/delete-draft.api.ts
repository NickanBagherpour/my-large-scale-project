import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { CLIENTS_LIST } = RQKEYS.BACKOFFICE;

export const useDeleteDraft = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draftName: string) => Api.deleteDraft(draftName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [CLIENTS_LIST.DRAFTS],
        refetchType: 'active',
      });
    },
  });
};
