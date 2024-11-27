import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetScopeChangeHistoryQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SCOPE_CHANGE_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getScopeChangeHistoryData(params), dispatch),
  });
};
