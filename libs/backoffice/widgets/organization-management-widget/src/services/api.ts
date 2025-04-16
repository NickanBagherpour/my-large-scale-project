import { client, API_PREFIX } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${API_PREFIX.PORTAL}/v1/redemption/report`, params);
  },

  getOrganizationInfo: async (params) => await client.get(`${API_PREFIX.PUBLISHER}/v1/organization`, { params }),
};
export default Api;
