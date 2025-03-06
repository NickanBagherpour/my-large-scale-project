import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';
import { TariffListQueryParamsType } from '../types';

export const useGetTariffListDataQuery = (params: TariffListQueryParamsType) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [RQKEYS.BUSINESS.TARIFF_LIST.GET_LIST, params],
    queryFn: withErrorHandling(() => Api.getTariffListData(params), dispatch),
  });
};
