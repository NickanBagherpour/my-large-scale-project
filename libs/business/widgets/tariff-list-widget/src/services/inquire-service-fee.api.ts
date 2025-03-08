import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import Api from './api';
import { ServiceFeeInquiryParams } from '../types/service-inquiry.type';

export const useServiceFeeInquiry = (params: ServiceFeeInquiryParams, dispatch: any) => {
  return useQuery({
    staleTime: 0,
    gcTime: 0,
    enabled: !!params['service-name'],
    queryKey: [RQKEYS.BUSINESS.TARIFF_LIST.INQUIRY, params],
    queryFn: withErrorHandling(() => Api.getServiceFeeInquiry(params), dispatch),
  });
};
