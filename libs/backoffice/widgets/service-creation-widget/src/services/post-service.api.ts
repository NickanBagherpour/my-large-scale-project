import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostServiceParams } from '../types';
import { updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';

const { SERVICE, SERVICES_LIST, SERVICE_CREATION } = RQKEYS.BACKOFFICE;

export const usePostService = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { serviceName } = useAppState();

  return useMutation({
    mutationFn: (params: PostServiceParams) => Api.postService(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [SERVICE, SERVICE_CREATION.SERVICE, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({
        queryKey: [SERVICES_LIST.DRAFTS],
        // Prevent immediate refetch to avoid potential conflicts between React context state and query cache state.
        // This can occur if useServiceInquiry is triggered again in the app component while the user is navigating
        // back to previous steps and editing them, especially when the initial step is greater than zero.
        // For more details, refer to: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({
        queryKey: [SERVICE],
        refetchType: 'none',
      });
    },
  });
};
