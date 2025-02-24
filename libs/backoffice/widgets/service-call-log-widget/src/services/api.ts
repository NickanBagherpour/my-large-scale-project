import { client, portalUrl } from '@oxygen/client';

import { ParamsType, ServicesDto } from '../types';
import { InquiryDto, InquiryParams } from '../types/get-Inquiry-info.type';
import { Drafts, DraftsParams } from '../types/services.type';
import { ClientServicesParams, ServiceParams, Services, ServiceToClientParams, Pagination } from './services.type';

const Api = {
  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${portalUrl}/v1/services`, { params });
    return client.get<ServicesDto>(`api/analytics/v1/reports/service-invocation`);
    // `${portalUrl}/v1/reports/service-invocation?clientGatewayId=2aba8f42-9f86-489f-a609-963c35260e02&serviceGatewayId=c222930c-c9a2-43ae-8312-5d910388a840&fromDate=1403/11/10&toDate=1403/11/30`
  },

  getClientsListData: async (params: any) => {
    return client.get<any>(`${portalUrl}/v1/clients`, { params });
  },
  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${portalUrl}/v1/clients/${clientName}/services`, { params }),
};
export default Api;
