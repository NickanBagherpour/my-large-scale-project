import { client, portalUrl, reportUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType, ServiceDetails, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ReportResponseType>(`${reportUrl}/v1/reports/services`, { params }),
  getServiceDetails: async (name: string) =>
    client.get<ServiceDetails>(`${reportUrl}/v1/reports/services/${name}/clients`),
};
export default Api;
