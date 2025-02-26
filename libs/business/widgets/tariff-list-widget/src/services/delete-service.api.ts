import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { TARIFF_LIST } = RQKEYS.BUSINESS;

export const useDeleteServiceQuery = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceName: string) => Api.deleteService(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [TARIFF_LIST.GET_LIST],
        refetchType: 'active',
      });
    },
  });
};
