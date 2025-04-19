import { API_PREFIX, client } from '@oxygen/client';

import { getTableReportParamsType, TableResponseType } from '../types';

const Api = {
  getTableReportData: async (params: getTableReportParamsType) => {
    return client.get<TableResponseType>(`${API_PREFIX.MANAGEMENT}/v1/services`, { params });
  },
  getServiceClients: async (serviceName: string) => {
    return client.get<string[]>(`${API_PREFIX.MANAGEMENT}/v1/services/${serviceName}/organizations`);
  },
  putServiceCommercialStatus: async (serviceName: string) => {
    return client.put(`${API_PREFIX.MANAGEMENT}/v1/services/${serviceName}`);
  },
};
export default Api;
