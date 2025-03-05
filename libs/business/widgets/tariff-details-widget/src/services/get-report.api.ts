import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportDataQuery = (serviceName: string) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.TARIFF_DETAILS.GET_LIST, serviceName],
    queryFn: withErrorHandling(() => Api.getReportData(serviceName), dispatch),
    networkMode: 'offlineFirst',
  });
};
