import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { typeScopeListParams } from '@oxygen/types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetScopeListQuery = (params: typeScopeListParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SCOPE_MANAGEMENT.GET_SCOPE_LIST, params],
    queryFn: withErrorHandling(() => Api.getScopeList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
