import { API_PREFIX, client } from '@oxygen/client';
import { ServiceFeeInuiryResponse, TariffListResponceType } from '../types';
import { ServiceFeeInquiryParams } from '../types/service-inquiry.type';
//TODO: set type of response and params and the url after api is be ready
const Api = {
  getTariffListData: async (params) => {
    return client.get<TariffListResponceType>(`${API_PREFIX.INVOICE}/v1/service-fees`, { params });
  },
  deleteService: async (serviceName: string) => {
    return client.delete<unknown>(`${API_PREFIX.INVOICE}/v1/service-fees/service-name/${serviceName}`);
  },
  getServiceFeeInquiry: async (params: ServiceFeeInquiryParams) => {
    return client.get<ServiceFeeInuiryResponse>(`${API_PREFIX.INVOICE}/v1/service-fees/inquiry`, { params });
  },
};
export default Api;
