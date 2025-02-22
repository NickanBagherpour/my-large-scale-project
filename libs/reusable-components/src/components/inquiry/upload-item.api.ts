import { client, portalUrl } from '@oxygen/client';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const backofficeKey = RQKEYS.BACKOFFICE;
export const useUploadItemMutation = (onSuccess: () => void, dispatch: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serviceName: string) => {
      return client.post(`${portalUrl}/v1/services/import-service?service-name=${serviceName}`);
    },
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [backofficeKey.SERVICE, backofficeKey.SERVICES_LIST.DRAFTS],
        refetchType: 'none',
      });
      onSuccess();
    },
  });
};
