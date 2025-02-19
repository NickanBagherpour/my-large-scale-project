import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { ParamsType } from '../types';
import { useAppDispatch } from '../context';
import Api from './api';
const backofficeKey = RQKEYS.BACKOFFICE;
export const useGetClientReportQuery = (params: ParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [backofficeKey.SERVICE, backofficeKey.SERVICES_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getClientReportList(params), dispatch),
    placeholderData: keepPreviousData,
  });
};
