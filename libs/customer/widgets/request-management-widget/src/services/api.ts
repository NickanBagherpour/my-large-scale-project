import { ParamsType } from '@oxygen/types';
import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getRequestsListData: async (params: ParamsType) => {
    const filteredParams = { orgName: params.searchTerm };
    try {
      const res = await client.get(`${portalUrl}/v1/submissions/search?sort=asc`, { params: filteredParams });
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
