import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import Api from './api';
import { FetchUpstreamListParamsType } from '../types';

export const useGetUpstreamListQuery = (params: FetchUpstreamListParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.UPSTREAM_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamData(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
  });
};
