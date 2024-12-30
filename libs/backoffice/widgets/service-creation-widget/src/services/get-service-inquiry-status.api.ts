import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useServiceInquiry = (serviceName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SERVICE_INQUIRY_STATUS],
    queryFn: withErrorHandling(() => Api.getServiceInquiry(serviceName), dispatch),
    enabled: Boolean(serviceName),
  });
};
