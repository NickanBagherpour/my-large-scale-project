import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
const businessKey = RQKEYS.BUSINESS;
export const useGetReportCardsDataQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [businessKey.DASHBOARD.CARDS],
    queryFn: withErrorHandling(() => Api.getReportCardData(), dispatch),
    placeholderData: keepPreviousData,
  });
};
