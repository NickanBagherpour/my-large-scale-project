import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { GetServiceParams } from '../types';

const { UPSERT_TARRIF } = RQKEYS.BUSINESS;

export const useGetFee = (params: GetServiceParams) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [UPSERT_TARRIF.TARIFF, params],
    queryFn: withErrorHandling(() => Api.getServiceFee(params), dispatch),
    enabled: !!params['service-name'],
  });
};
