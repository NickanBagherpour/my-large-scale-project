import { queryClient } from '@oxygen/client';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../context';
import Api from './api';
import { EditServiceRequest } from '../types/edit-service.type';
const backofficeKey = RQKEYS.BACKOFFICE;
export const useEditServiceMutation = (onSuccess: (v?: string) => void, serviceName?: string, id?: number) => {
  const dispatch = useAppDispatch();
  // const { serviceName } = useAppState();
  return useMutation({
    mutationFn: (params: EditServiceRequest) => Api.editService(params),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [backofficeKey.SERVICE, serviceName],
        refetchType: 'none',
      });
      onSuccess(serviceName);
    },
  });
};
