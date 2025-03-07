import { client, invoiceUrl } from '@oxygen/client';
import { ServiceFeeInuiryResponse, TariffListResponceType } from '../types';
import { ServiceFeeInquiryParams } from '../types/service-inquiry.type';
//TODO: set type of response and params and the url after api is be ready
const Api = {
  getTariffListData: async (params) => {
    return client.get<TariffListResponceType>(`${invoiceUrl}/v1/service-fees`, { params });
  },
  deleteService: async (serviceName: string) => {
    return client.delete<unknown>(`${invoiceUrl}/v1/service-fees/service-name/${serviceName}`);
  },
  getServiceFeeInquiry: async (params: ServiceFeeInquiryParams) => {
    return client.get<ServiceFeeInuiryResponse>(`${invoiceUrl}/v1/service-fees/inquiry`, { params });
  },
};
export default Api;
