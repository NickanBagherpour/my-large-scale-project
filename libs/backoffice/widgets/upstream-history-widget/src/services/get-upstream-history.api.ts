import { RQKEYS } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { UpstreamHistory } from '../types';

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
