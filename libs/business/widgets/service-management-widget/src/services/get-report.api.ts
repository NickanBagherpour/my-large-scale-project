import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { getTableReportParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportDataQuery = (params: getTableReportParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.BUSINESS_SERVICE_MANAGEMENT.GET_TABLE, params],
    queryFn: withErrorHandling(() => Api.getTableReportData(params), dispatch),
  });
};
