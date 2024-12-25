import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
// import { GrantType } from '../types';

export const useGetRouteDetailsQuery = (params: any) => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.ROUTE_DETAILS.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getRouteDetails(params), dispatch),
  });
};
