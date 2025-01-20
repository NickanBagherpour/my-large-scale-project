import { useQuery, useMutation, keepPreviousData, useQueryClient } from '@tanstack/react-query';

import { RQKEYS, ApiUtil } from '@oxygen/utils';

import { useAppDispatch } from '../../context';
import Api from '../api';

export const useSecondStepRequestRegistrationMutationQuery = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: any) => Api.requestRegistrationSecondStep(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.CUSTOMER.REQUEST_MANAGEMENT.DRAFTS],
        refetchType: 'none',
      });
    },
  });
};
