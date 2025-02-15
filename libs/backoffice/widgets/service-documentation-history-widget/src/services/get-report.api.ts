import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetReportDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.SERVICE_DOCUMENTATION_HISTORY.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getReportData(params), dispatch),
  });
};
