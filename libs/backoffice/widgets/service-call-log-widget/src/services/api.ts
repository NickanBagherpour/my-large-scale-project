import { API_PREFIX, client } from '@oxygen/client';

import { ParamsType, ServicesDto, ServicesLogsDto } from '../types';
import { ClientServicesParams, Services } from './services.type';

const Api = {
  getServiceLogs: async (params: ParamsType) => {
    return client.get<ServicesLogsDto>(`${API_PREFIX.REPORT}/v1/reports/invocations`, { params });
  },

  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${API_PREFIX.PUBLISHER}/v1/services`, { params });
  },

  getClientsListData: async (params: any) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/clients`, { params });
  },
  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}/services`, { params }),
};
export default Api;
