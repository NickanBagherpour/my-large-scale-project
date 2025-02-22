import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { client, portalUrl } from '@oxygen/client';
import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { API_URLS } from './consts';
import { InquiryDto, InquiryParams, InquiryType } from './types';

const { SERVICE, SERVICES_LIST } = RQKEYS.BACKOFFICE;
const { CLIENT, CLIENTS_LIST } = RQKEYS.BACKOFFICE;
const keys = {
  service: [SERVICE, SERVICES_LIST.INQUIRY],
  client: [CLIENT, CLIENTS_LIST.INQUIRY],
};
export const useInquiry = (type: InquiryType, params: InquiryParams, dispatch: any) => {
  return useQuery({
    placeholderData: keepPreviousData,
    enabled: false,
    queryFn: withErrorHandling(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return client.get<InquiryDto>(`${portalUrl}${API_URLS[type]}`, { params: { [`${type}-name`]: params.name } });
    }, dispatch),
    queryKey: [keys[type], params.name],
  });
};
