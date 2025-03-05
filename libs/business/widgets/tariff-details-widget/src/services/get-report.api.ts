import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportDataQuery = (params: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.TARIFF_DETAILS.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getReportData(params), dispatch),
    networkMode: 'offlineFirst',
  });
};
