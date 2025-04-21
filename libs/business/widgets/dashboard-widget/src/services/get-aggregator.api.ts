import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const dashboardKey = RQKEYS.BUSINESS.DASHBOARD;
export const useGetAggregatorQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [dashboardKey.AGGRIGATOR],
    queryFn: withErrorHandling(() => Api.getMostValuableAggregator(), dispatch),
    placeholderData: keepPreviousData,
  });
};
