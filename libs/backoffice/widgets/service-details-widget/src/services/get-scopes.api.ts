import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
