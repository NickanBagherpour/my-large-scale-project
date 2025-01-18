import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
// import { GrantType } from '../types';

export const useGetRouteDetailsQuery = (params: any) => {
  const dispatch = useAppDispatch();
  const { SERVICE, ROUTE_DETAILS } = RQKEYS.BACKOFFICE;
  return useQuery<any>({
    queryKey: [SERVICE, ROUTE_DETAILS.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getRouteDetails(params), dispatch),
  });
};
