import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
const businesseKey = RQKEYS.BUSINESS;
export const useGetClientReportQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [businesseKey.CLIENTS_REPORT, params],
    queryFn: withErrorHandling(() => Api.getClientReportList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
