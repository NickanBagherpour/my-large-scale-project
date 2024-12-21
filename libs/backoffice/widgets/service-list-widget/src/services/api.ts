import Mockify from '@oxygen/mockify';

import { ParamsType } from '../types';
import { client } from '@oxygen/client';
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
    return client.post<InquiryInfo>(`http://192.168.54.166:7007/publisher/api/v1/services/service-inquiry`, params);
  },
};
export default Api;
