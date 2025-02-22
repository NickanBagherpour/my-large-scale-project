import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling, ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetRequestQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSTOMER.REQUEST_REGISTRATION.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRequestData(), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetRequestDataQuery = (submissionId: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.CUSTOMER.REQUEST_REGISTRATION.GET_REQUEST_DATA],
    queryFn: withErrorHandling(() => Api.geRequestData(submissionId), dispatch),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    staleTime: 0,
  });
};

export const useFourthStepRequestRegistrationMutationQuery = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: any) => Api.requestRegistrationFourthStepWithSelectedOrganization(params),
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
