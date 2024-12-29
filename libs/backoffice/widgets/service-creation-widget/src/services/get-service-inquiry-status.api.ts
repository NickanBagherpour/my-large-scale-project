import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

export const useServiceInquiryStatus = (serviceName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [RQKEYS.SERVICE_CREATION.SERVICE_INQUIRY_STATUS],
    queryFn: withErrorHandling(() => Api.getServiceInquiryStatus(serviceName), dispatch),
    enabled: Boolean(serviceName),
  });
};
