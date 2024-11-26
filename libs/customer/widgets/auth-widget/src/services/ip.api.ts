import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportDataQuery = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.AUTH.IP, params],
    queryFn: withErrorHandling(() => Api.getIP(params), dispatch),
  });
};
