import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetRouteHistoryQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.ROUTE_CHANGE_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getRouteChangeHistoryData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
