import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';

import { useAppDispatch } from '../context';
import { FetchParamsType } from '../types';
import Api from './api';

export const useGetReportDataQuery = (params: FetchParamsType) => {
  const dispatch = useAppDispatch();

  // return useQuery({
  //   queryKey: [RQKEYS.REQUEST_DETAILS.GET_LIST, params],
  //   queryFn: withErrorHandling(() => Api.getReportData(params), dispatch),
  // });
};
