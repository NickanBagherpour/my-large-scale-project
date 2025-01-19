import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
import { useChangeHistoryQuery } from '@oxygen/hooks';

export const useGetsServiceHistoryDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getServiceHistoryData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};

type UpstreamHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  modifyBy: string;
};

const { UPSTREAM, UPSTREAM_HISTORY } = RQKEYS.BACKOFFICE;

export const useGetUpstreamHistory = (params: { page: number; size: number; upstreamName: string }) => {
  const { page, size, upstreamName } = params;
  const dispatch = useAppDispatch();

  return useChangeHistoryQuery<UpstreamHistory>({
    queryKey: [UPSTREAM, UPSTREAM_HISTORY.GET_LIST],
    url: `/v1/upstreams/${upstreamName}/history`,
    dispatch,
    params: {
      page,
      size,
    },
  });
};
