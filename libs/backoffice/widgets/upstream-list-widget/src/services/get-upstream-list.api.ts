import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { FetchUpstreamListParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamListQuery = (params: FetchUpstreamListParamsType) => {
  const dispatch = useAppDispatch();
  const {
    UPSTREAM,
    UPSTREAM_LIST: { GET_LIST },
  } = RQKEYS.BACKOFFICE;
  return useQuery({
    queryKey: [UPSTREAM, GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamData(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
  });
};
