import { client, reportUrl } from '@oxygen/client';

import { FetchParamsType, ServiceClientsResponse, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ServicesReportResponseType>(`${reportUrl}/v1/reports/services`, { params }),
  getServiceClients: async (name: string) =>
    client.get<ServiceClientsResponse>(`${reportUrl}/v1/reports/services/${name}/clients`),
};
export default Api;
