import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
// import { GrantType } from '../types';

export const useUpstreamListQuery = (params: string) => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.SERVICE_DETAILS.GET_UPSTREAM_LIST, params],
    queryFn: withErrorHandling(() => Api.getUpstreamList(params), dispatch),
  });
};
