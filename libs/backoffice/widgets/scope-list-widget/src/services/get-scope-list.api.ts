import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../context';

import { TypeScopeListParams } from '../types';
import Api from './api';

export const useGetScopeListQuery = (params: TypeScopeListParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SCOPE_MANAGEMENT.GET_SCOPE_LIST, params],
    queryFn: withErrorHandling(() => Api.getScopeList(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
  });
};
