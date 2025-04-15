import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ReportParams } from '../types';

export const useGetFinancialReportQuery = (params: ReportParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.DETAILED_BILL_REPORT.FINANCIAL, params],
    queryFn: withErrorHandling(() => Api.getFinancialReport(params), dispatch),
  });
};
