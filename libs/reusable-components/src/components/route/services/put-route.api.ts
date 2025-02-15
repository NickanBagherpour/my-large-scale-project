import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { Dispatch } from 'react';
import { PutRouteParams } from '../type/route.type';

const { SERVICE, SERVICE_CREATION, SERVICES_LIST } = RQKEYS.BACKOFFICE;

type Props = {
  dispatch: Dispatch<any>;
  serviceName: string;
};

export const usePutRouteMutation = (props: Props) => {
  const { serviceName, dispatch } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PutRouteParams) => Api.putRoute(params),
    onError: (e) => {
      const msg = ApiUtil.getErrorMessage(e);
      dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: msg });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [SERVICE_CREATION.ROUTE, serviceName],
        refetchType: 'none',
      });
      await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST.DRAFTS], refetchType: 'none' });
      await queryClient.invalidateQueries({ queryKey: [SERVICE], refetchType: 'none' });
    },
  });
};
