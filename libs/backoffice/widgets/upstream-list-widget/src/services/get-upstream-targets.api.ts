import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import Api from './api';
import { FetchUpstreamTargetParamsType } from '../types';

export const useGetUpstreamTargetQuery = (params: FetchUpstreamTargetParamsType) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.UPSTREAM_LIST.GET_UPSTREAM_TARGET, params],
    queryFn: withErrorHandling(() => Api.getUpstreamTarget(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
    enabled: !!params,
  });
};
