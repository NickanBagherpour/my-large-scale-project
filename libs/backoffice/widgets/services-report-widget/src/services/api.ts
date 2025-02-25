import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ServiceDetails, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ServicesReportResponseType>(`${portalUrl}/v1/services`, { params }),
  getServiceDetails: async (name: string) =>
    client.get<ServiceDetails>(`${portalUrl}/v1/services/service-with-details/${name}`),
};
export default Api;
