import { useQuery } from '@tanstack/react-query';

import { Nullable } from '@oxygen/types';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../../context';

import Api from '../api';
// import { GrantType } from '../types';

export const useUpstreamListQuery = (params: Nullable<string>) => {
  const dispatch = useAppDispatch();
  console.log(params);
  return useQuery<any>({
    queryKey: [RQKEYS.SERVICE_DETAILS.GET_UPSTREAM_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamList(params), dispatch),
  });
};
