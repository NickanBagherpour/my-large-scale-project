import { client, portalUrl } from '@oxygen/client';

import { getTableReportParamsType, TableResponseType } from '../types';

const Api = {
  getTableReportData: async (params: getTableReportParamsType) => {
    return client.get<TableResponseType>(`${portalUrl}/management/api/v1/services`, { params });
  },
  getServiceClients: async (serviceName: string) => {
    return client.get<string[]>(`${portalUrl}/management/api/v1/services/${serviceName}/organizations`);
  },
  putServiceCommercialStatus: async (serviceName: string) => {
    return client.put(`${portalUrl}/management/api/v1/services/${serviceName}`);
  },
};
export default Api;
