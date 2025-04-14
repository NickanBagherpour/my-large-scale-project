import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ServicesReportResponseType } from '../types';

const Api = {
  getServicesReport: async (params: FetchParamsType) =>
    client.get<ServicesReportResponseType>(`${API_PREFIX.PUBLISHER}/v1/services`, { params }),
};
export default Api;
