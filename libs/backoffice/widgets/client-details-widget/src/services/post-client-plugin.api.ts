import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientPluginParams, ClientPlugins } from '../types';
import { updateMessageAction, useAppDispatch } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { getKeys } from './get-client-plugins.api';
import { useClientName } from '../utils/use-client-name';

export const useClientPluginMutation = () => {
  const dispatch = useAppDispatch();
  const name = useClientName();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ClientPluginParams) => Api.postClientConfig(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
    },
    async onSuccess() {
      // queryClient.setQueryData(getKeys(name), (oldData: ClientPlugins) => {
      //   return oldData.map();
      // });
      // await queryClient.invalidateQueries({ queryKey: getKeys(name), refetchType: 'active' });
    },
  });
};
