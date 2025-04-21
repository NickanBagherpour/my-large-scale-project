import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const dashboardKey = RQKEYS.BUSINESS.DASHBOARD;
export const useGetRequestStatusQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [dashboardKey.REQUEST_STATUS],
    queryFn: withErrorHandling(() => Api.getRequestStatusDistribution(), dispatch),
    placeholderData: keepPreviousData,
  });
};
