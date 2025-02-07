import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ClientPluginParams } from './plugins.type';

export const useClientPluginMutation = () => {
  // const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (params: ClientPluginParams) => Api.postClientConfig(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
    },
  });
};
