import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const dashboardKey = RQKEYS.BUSINESS.DASHBOARD;
export const useGetReportCardsDataQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [dashboardKey.REPORT_CARD],
    queryFn: withErrorHandling(() => Api.getReportCardData(), dispatch),
    placeholderData: keepPreviousData,
  });
};
