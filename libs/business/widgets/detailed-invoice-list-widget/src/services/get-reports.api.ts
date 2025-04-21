import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ReportsParams } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportsQuery = (params: ReportsParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.DETAILED_INVOICE_LIST.REPORTS, params],
    queryFn: withErrorHandling(() => Api.getReports(params), dispatch),
  });
};
