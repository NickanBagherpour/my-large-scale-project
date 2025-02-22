import { useQuery } from '@tanstack/react-query';

import { Nullable } from '@oxygen/types';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import { UpstreamListData } from '../../types';

import Api from '../api';
export type UseUpstreamListQueryParamsType = {
  serviceName: Nullable<string>;
};
export const useUpstreamListQuery = (params: UseUpstreamListQueryParamsType) => {
  const { serviceName } = params;
  const dispatch = useAppDispatch();
  return useQuery<UpstreamListData>({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_DETAILS.GET_UPSTREAM_LIST, serviceName],
    queryFn: withErrorHandling(() => Api.getUpstreamList(serviceName), dispatch),
  });
};
