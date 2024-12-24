import Mockify from '@oxygen/mockify';

import { ParamsType } from '../types';
import { client, portalUrl } from '@oxygen/client';
import { InquiryInfo, InquiryParams } from '../types/get-Inquiry-info.type';
const Api = {
  getServicesList: async (params: ParamsType) => {
    const res = Mockify.getServicesList(params);
    return res;
  },

  getDraftsData: async () => {
    return Mockify.getServicesDrafts();
  },
  getInquiryInfo: async (params: InquiryParams) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return client.get<InquiryInfo>(`${portalUrl}/v1/services/service-inquiry-status`, { params });
  },
  uploadService: async (serviceName: string) => {
    return client.post(`${portalUrl}v1/services/import-service`, { 'service-name': serviceName });
  },
};
export default Api;
