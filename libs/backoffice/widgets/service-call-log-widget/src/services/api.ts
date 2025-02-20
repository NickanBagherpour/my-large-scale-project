import { client, portalUrl } from '@oxygen/client';

import { ParamsType, ServicesDto } from '../types';
import { InquiryDto, InquiryParams } from '../types/get-Inquiry-info.type';
import { Drafts, DraftsParams } from '../types/services.type';
import { ClientServicesParams, ServiceParams, Services, ServiceToClientParams, Pagination } from './services.type';

const Api = {
  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${portalUrl}/v1/services`, { params });
    // `${portalUrl}/v1/reports/service-invocation?clientGatewayId=2aba8f42-9f86-489f-a609-963c35260e02&serviceGatewayId=c222930c-c9a2-43ae-8312-5d910388a840&fromDate=1403/11/10&toDate=1403/11/30`
  },
  // getDraftsData: async () => {
  //   return client.get<DraftDto[]>(`${portalUrl}/v1/services/draft`);
  // },
  getDraftsData: async (params: DraftsParams) => {
    return client.get<Drafts>(`${portalUrl}/v1/services/draft`, { params });
  },
  getInquiryInfo: async (params: InquiryParams) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return client.get<InquiryDto>(`${portalUrl}/v1/services/service-inquiry`, { params });
  },
  uploadService: async (serviceName: string) => {
    return client.post(`${portalUrl}/v1/services/import-service?service-name=${serviceName}`);
  },
  getServices: async (params: ServiceParams & Pagination) =>
    client.get<Services>(`${portalUrl}/v1/services`, { params }),

  postAssignServiceToClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.post(`${portalUrl}/v1/clients/${clientName}/services/${serviceInfoId}`),

  deleteUnassignServiceFromClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.delete(`${portalUrl}/v1/clients/${clientName}/services/${serviceInfoId}`),

  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${portalUrl}/v1/clients/${clientName}/services`, { params }),
  getClientPlugins: async (name: string) => client.get<any>(`${portalUrl}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) => client.get<any[]>(`${portalUrl}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: any) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceName, ...body }: any) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client-service/${clientName}/${serviceName}`, body),
};
export default Api;
