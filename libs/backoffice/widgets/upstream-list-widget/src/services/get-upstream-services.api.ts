import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from './api';
import { FetchUpstreamServiceParamsType } from '../types';
import { useAppDispatch } from '../context';

export const useGetUpstreamServicesQuery = (params: FetchUpstreamServiceParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_LIST.GET_UPSTREAM_SERVICES, params],
    queryFn: withErrorHandling(() => Api.getUpstreamServices(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
    enabled: !!params,
  });
};
