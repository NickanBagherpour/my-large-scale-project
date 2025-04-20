import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const businessKey = RQKEYS.BUSINESS;
export const useGetTopMetricsDataQuery = (type: number) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [businessKey.DASHBOARD.TOP_METRICS_CARD, type],
    queryFn: withErrorHandling(() => Api.getTopMetrics(), dispatch),
    placeholderData: keepPreviousData,
  });
};
