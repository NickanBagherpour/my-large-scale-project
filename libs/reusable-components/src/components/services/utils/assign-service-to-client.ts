import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { ServiceToClientParams } from './services.type';

const { CLIENT_SERVICES } = RQKEYS.BACKOFFICE.CLIENT_DETAILS;

export const useAssignServiceToClient = () => {
  // const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ServiceToClientParams) => Api.postAssignServiceToClient(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      // updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [CLIENT_SERVICES] });
    },
  });
};
