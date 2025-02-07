import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { ServicePluginParams } from './plugins.type';

export const useServiceMutaionMutation = () => {
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (params: ServicePluginParams) => Api.postServiceConfig(params),
    onError(e) {
      const err = ApiUtil.getErrorMessage(e);
      // updateMessageAction(dispatch, err);
    },
  });
};
