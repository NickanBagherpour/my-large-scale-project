import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import Api from './api';
import { FetchUpstreamServiceParamsType } from '../types';
import { useAppDispatch } from '../context';

export const useGetUpstreamServicesQuery = (params: FetchUpstreamServiceParamsType) => {
  const dispatch = useAppDispatch();
  const {
    UPSTREAM,
    UPSTREAM_LIST: { GET_UPSTREAM_SERVICES },
  } = RQKEYS.BACKOFFICE;
  return useQuery({
    //EXCEPTION: DONT ADD UPSTREAM GENERAL KEY
    queryKey: [GET_UPSTREAM_SERVICES, params],
    queryFn: withErrorHandling(() => Api.getUpstreamServices(params), dispatch),
    // placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
    enabled: !!params,
    staleTime: 0,
  });
};
