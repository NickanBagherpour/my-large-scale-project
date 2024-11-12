import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { FetchParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetTableDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();
  console.log('this is the react query params:', params);
  return useQuery({
    queryKey: [RQKEYS.CLIENT_CREATION.TABLE_DATA, params],
    queryFn: withErrorHandling(() => Api.getTableReportData(params), dispatch),
    enabled: false,
  });
};
