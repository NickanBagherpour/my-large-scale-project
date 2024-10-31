import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetsServiceHistoryDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.SERVICE_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getServiceHistoryData(params), dispatch),
  });
};
