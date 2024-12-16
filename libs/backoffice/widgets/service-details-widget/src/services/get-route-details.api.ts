import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
// import { GrantType } from '../types';

export const useGetRouteDetailsQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery<any>({
    queryKey: [RQKEYS.SERVICE_DETAILS.GET_LIST],
    queryFn: withErrorHandling(() => Api.getRouteDetails(), dispatch),
  });
};
