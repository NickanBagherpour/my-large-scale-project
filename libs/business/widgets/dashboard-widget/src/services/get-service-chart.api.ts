import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const businessKey = RQKEYS.BUSINESS;
export const useGetServiceChartDataQuery = (type: number) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [businessKey.DASHBOARD.GET_LIST, type],
    queryFn: withErrorHandling(() => Api.getServiceChartData(type), dispatch),
    placeholderData: keepPreviousData,
  });
};
