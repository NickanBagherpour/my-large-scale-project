import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useServiceInquiry = (serviceName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICES_LIST.DRAFTS, serviceName],
    queryFn: withErrorHandling(() => Api.getServiceInquiry(serviceName), dispatch),
    enabled: Boolean(serviceName),
  });
};
