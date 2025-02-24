import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) => {
    return client.get<ServicesReportResponseType>(`${portalUrl}/v1/services`, { params });
  },
};
export default Api;
