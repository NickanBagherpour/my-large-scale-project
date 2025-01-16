import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
import { useChangeHistoryQuery } from '@oxygen/hooks';

export const useGetsServiceHistoryDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getServiceHistoryData(params), dispatch),
    placeholderData: keepPreviousData,
  });
};

export const useGetServiceHistory = (params: { page: number; size: number }) => {
  const { page, size } = params;

  return useChangeHistoryQuery({
    queryKey: ['hello', RQKEYS.BACKOFFICE.SERVICE_HISTORY.GET_LIST, params],
    url: '/v1/services',
    page,
    size,
  });
};
