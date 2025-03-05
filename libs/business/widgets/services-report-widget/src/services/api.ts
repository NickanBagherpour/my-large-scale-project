import { client, reportUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType, ServiceClientsResponse } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ReportResponseType>(`${reportUrl}/v1/reports/services`, { params }),
  getServiceClients: async (name: string) =>
    client.get<ServiceClientsResponse>(`${reportUrl}/v1/reports/services/${name}/clients`),
};
export default Api;
