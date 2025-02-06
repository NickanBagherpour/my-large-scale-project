import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ServicePluginParams } from './plugins.type';

export const usePostRouteMutation = () => {
  // const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: ServicePluginParams) => Api.postServiceConfig(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      // updateMessageAction(dispatch, err);
    },
    // async onSuccess() {
    // TODO: invalidate queries
    // await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST.DRAFTS], refetchType: 'none' });
    // },
  });
};
