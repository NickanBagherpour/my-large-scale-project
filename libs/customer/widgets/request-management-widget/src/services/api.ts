import { RequestParamsType } from '@oxygen/types';
import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getRequestsListData: async (params: RequestParamsType) => {
    // debugger;
    const filteredParams: any = { orgName: params.searchTerm };
    // if (params.status && params.status === 'confirmed') {
    //   //confirmed
    //   const arrayValue = [6, 7];
    //   filteredParams.searchStatusSet = arrayValue;
    // } else if (params.status && params.status === 'reviewed') {
    //   //reviewed
    //   filteredParams.searchStatusSet = [2, 5];
    // } else if (params.status && params.status === 'rejected') {
    //   //rejected
    //   filteredParams.searchStatusSet = [3, 4];
    // }
    // debugger;
    try {
      // const queryString = new URLSearchParams(filteredParams).toString();
      const res = await client.get(`${portalUrl}/v1/submissions/search?sort=asc`, { params: filteredParams });
      // const res = await client.get(`${portalUrl}/v1/submissions/search?sort=asc&${queryString}`);
      // debugger;
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
