import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { ReportParams } from '../types';

type Props = {
  params: ReportParams;
  enabled: boolean;
};

export const useGetNonFinancialReportQuery = (props: Props) => {
  const { enabled, params } = props;
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.DETAILED_BILL_REPORT.NON_FINANCIAL, params],
    queryFn: withErrorHandling(() => Api.getNonfinancialReport(params), dispatch),
    enabled,
  });
};
