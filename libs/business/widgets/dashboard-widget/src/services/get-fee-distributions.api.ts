import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const dashboardKey = RQKEYS.BUSINESS.DASHBOARD;
export const useGetFeeDistributionsQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [dashboardKey.FEE_DISTRIBUTION],
    queryFn: withErrorHandling(() => Api.getFeeDistribution(), dispatch),
    placeholderData: keepPreviousData,
  });
};
