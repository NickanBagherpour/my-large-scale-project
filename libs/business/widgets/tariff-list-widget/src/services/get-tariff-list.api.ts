import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useGetTariffListtDataQuery = (params) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.TARIFF_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getTariffListData(params), dispatch),
  });
};
