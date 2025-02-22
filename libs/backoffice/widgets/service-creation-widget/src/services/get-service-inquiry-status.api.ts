import { useQuery } from '@tanstack/react-query';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import Api from './api';

const { SERVICE, SERVICES_LIST } = RQKEYS.BACKOFFICE;

export const useServiceInquiry = (serviceName: string) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: [SERVICE, SERVICES_LIST.INQUIRY, serviceName],
    queryFn: withErrorHandling(() => Api.getServiceInquiry(serviceName), dispatch),
    enabled: Boolean(serviceName),
  });
};
