import { useQuery } from '@tanstack/react-query';
import Api from './api';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';

const { UPSERT_TARRIF } = RQKEYS.BUSINESS;

export const useGetFee = (serviceName: string | null) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [UPSERT_TARRIF.TARIFF],
    queryFn: withErrorHandling(() => Api.getServiceFee(serviceName!), dispatch, { ignore404Errors: true }),
    enabled: !!serviceName,
  });
};
