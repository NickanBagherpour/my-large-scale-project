import { client, portalUrl, reportUrl } from '@oxygen/client';

import { ParamsType, ServicesDto, ServicesLogsDto } from '../types';
import { ClientServicesParams, ServiceParams, Services, ServiceToClientParams, Pagination } from './services.type';

const Api = {
  getServiceLogs: async (params: ParamsType) => {
    return client.get<ServicesLogsDto>(`${reportUrl}/v1/reports/invocations`, { params });
  },

  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${portalUrl}/v1/services`, { params });
  },

  getClientsListData: async (params: any) => {
    return client.get<any>(`${portalUrl}/v1/clients`, { params });
  },
  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${portalUrl}/v1/clients/${clientName}/services`, { params }),
};
export default Api;
