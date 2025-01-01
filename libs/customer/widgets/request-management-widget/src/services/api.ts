import { RequestParamsType } from '@oxygen/types';
import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getRequestsListData: async (params: RequestParamsType) => {
    // debugger;
    const sort = params.sort === 'newest' ? 'asc' : 'desc';
    // Initialize filteredParams with the searchTerm
    const filteredParams: { [key: string]: string | number | string[] | number[] } = {
      orgName: params.searchTerm,
      sort: sort,
    };

    // Check the status and assign the corresponding searchStatusSet values
    if (params.status && params.status === 'confirmed') {
      // confirmed
      filteredParams.searchStatusSet = [6, 7];
    } else if (params.status && params.status === 'reviewed') {
      // reviewed
      filteredParams.searchStatusSet = [2, 5];
    } else if (params.status && params.status === 'rejected') {
      // rejected
      filteredParams.searchStatusSet = [3, 4];
    }

    // Manually build the query string
    const queryString = Object.entries(filteredParams)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    // debugger;

    try {
      // const queryString = new URLSearchParams(filteredParams).toString();
      // const res = await client.get(`${portalUrl}/v1/submissions/search?sort=asc`, { params: filteredParams });
      const res = await client.get(`${portalUrl}/v1/submissions/search?${queryString}`);
      // debugger;
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
