import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetInvoiceListQuery = (params) => {
  const dispatch = useAppDispatch();

  const {
    INVOICE_LIST: { GET_LIST },
  } = RQKEYS.BUSINESS;

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.REQUEST, GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getInvoiceList(params), dispatch),
    placeholderData: keepPreviousData,
    networkMode: 'offlineFirst',
    staleTime: 5 * 1000,
  });
};
