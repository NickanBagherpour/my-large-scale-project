import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetServicesReportQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();
  const { GET_LIST } = RQKEYS.BACKOFFICE.SERVICES_REPORT;

  return useQuery({
    queryKey: [GET_LIST, params],
    // queryFn: withErrorHandling(() => Api.getServicesReport(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
    // staleTime: 5 * 1000,
  });
};
