import { useQuery } from '@tanstack/react-query';

import { Nullable } from '@oxygen/types';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import { UpstreamListData } from '../../types';

import Api from '../api';

export const useUpstreamListQuery = (params: Nullable<string>) => {
  const dispatch = useAppDispatch();
  return useQuery<UpstreamListData>({
    queryKey: [RQKEYS.SERVICE_DETAILS.GET_UPSTREAM_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamList(params), dispatch),
  });
};
