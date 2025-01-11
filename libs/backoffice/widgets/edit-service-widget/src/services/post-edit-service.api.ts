import { queryClient } from '@oxygen/client';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppState } from '../context';
import Api from './api';
import { EditServiceRequest } from '../types/edit-service.type';

export const useEditServiceMutation = (onSuccess: (v?: string) => void) => {
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  return useMutation({
    mutationFn: (params: EditServiceRequest) => Api.editService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.EDIT_SERVICE.GET_DETAIL, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.SERVICE_DETAILS.GET_LIST, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({
        queryKey: [RQKEYS.SERVICES_LIST.GET_LIST],
        // Prevent immediate refetch to avoid potential conflicts between React context state and query cache state.
        // This can occur if useServiceInquiry is triggered again in the app component while the user is navigating
        // back to previous steps and editing them, especially when the initial step is greater than zero.
        // For more details, refer to: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
        refetchType: 'none',
      });
      onSuccess(serviceName);
    },
  });
};
