import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ServiceClientsResponse, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ServicesReportResponseType>(`${API_PREFIX.REPORT}/v1/reports/services`, { params }),
  getServiceClients: async (name: string) =>
    client.get<ServiceClientsResponse>(`${API_PREFIX.REPORT}/v1/reports/services/${name}/clients`),
};
export default Api;
