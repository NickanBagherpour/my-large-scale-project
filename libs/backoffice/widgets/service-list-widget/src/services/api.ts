import { client, portalUrl } from '@oxygen/client';

import { ParamsType, ServicesDto } from '../types';
import { InquiryDto, InquiryParams } from '../types/get-Inquiry-info.type';
import { DraftDto } from '../types/get-drafts-info.type';

const Api = {
  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${portalUrl}/v1/services`, { params });
  },
  getDraftsData: async () => {
    return client.get<DraftDto[]>(`${portalUrl}/v1/services/draft`);
  },
  getInquiryInfo: async (params: InquiryParams) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return client.get<InquiryDto>(`${portalUrl}/v1/services/service-inquiry`, { params });
  },
  uploadService: async (serviceName: string) => {
    return client.post(`${portalUrl}v1/services/import-service`, { 'service-name': serviceName });
  },
};
export default Api;
