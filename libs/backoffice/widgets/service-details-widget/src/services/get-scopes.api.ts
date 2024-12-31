import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Nullable } from '@oxygen/types';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { Pagination } from '@oxygen/types';

export const useGetScopes = (params: any) => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.GET_SCOPE.SEARCH, params],
    queryFn: withErrorHandling(() => Api.getScopeListBySearch(params), dispatch),
    // placeholderData: keepPreviousData,
  });
};

export const useGetServiceScope = (params: any) => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.GET_SCOPE.SERVICE_SCOPE, params],
    queryFn: withErrorHandling(() => Api.getServiceScope(params), dispatch),
    // placeholderData: keepPreviousData,
  });
};
