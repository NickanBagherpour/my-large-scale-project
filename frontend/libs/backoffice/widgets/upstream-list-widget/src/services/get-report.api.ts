import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { UpstreamParamsType } from '@oxygen/types';

import { useAppDispatch } from '../context';
import Api from './api';

export const useGetUpstreamQuery = (params: UpstreamParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.UPSTREAM_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamData(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
  });
};
