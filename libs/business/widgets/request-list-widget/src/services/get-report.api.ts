import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import type { Pagination } from '@oxygen/types';

export const useGetScopeListQuery = (params: Pagination) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SCOPE_MANAGEMENT.GET_SCOPE_LIST, params],
    queryFn: withErrorHandling(() => Api.getRequestList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
