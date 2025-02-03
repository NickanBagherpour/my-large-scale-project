import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { client, portalUrl } from '@oxygen/client';
import { withErrorHandling } from '@oxygen/utils';
import { API_URLS } from './consts';
import { InquiryDto, InquiryParams, InquiryType } from './types';

export const useInquiry = (type: InquiryType, params: InquiryParams, dispatch: any) => {
  return useQuery({
    placeholderData: keepPreviousData,
    enabled: false,
    queryFn: withErrorHandling(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return client.get<InquiryDto>(`${portalUrl}${API_URLS[type]}`, { params: { [`${type}-name`]: params.name } });
    }, dispatch),
    queryKey: [`inquiry-${type}`, params.name],
  });
};
