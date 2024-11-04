import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useQuery } from '@tanstack/react-query';

import { FetchParamsType } from '../types';
import Api from './api';
import { useAppDispatch } from '../context';

export const useGetServiceInfoQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICE_EDIT.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getServiceInfo(params.id!), dispatch),
    enabled: Boolean(params.id),
  });
};
