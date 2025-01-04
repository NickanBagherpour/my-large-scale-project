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
      filteredParams.searchStatusSet = 3;
    } else if (params.status && params.status === 'reviewed') {
      // reviewed
      filteredParams.searchStatusSet = 1;
    } else if (params.status && params.status === 'rejected') {
      // rejected
      filteredParams.searchStatusSet = 2;
    }

    // Manually build the query string
    // const queryString = Object.entries(filteredParams)
    //   .map(([key, value]) => {
    //     if (Array.isArray(value)) {
    //       return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
    //     }
    //     return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    //   })
    //   .join('&');

    try {
      const res = await client.get(`${portalUrl}/v1/submissions/search?`, { params: filteredParams });
      // const res = await client.get(`${portalUrl}/v1/submissions/search?${queryString}`);
      return res;
    } catch (error) {
      console.error('Error fetching request list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  getRequestDraftListData: async () => {
    // debugger;

    try {
      const res = await client.get(`${portalUrl}/v1/submissions/drafts`);
      // debugger;
      return res;
    } catch (error) {
      console.error('Error fetching requests drafts list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  deleteSelectedRequest: async (submissionId: number) => {
    try {
      const res = await client.delete(`${portalUrl}/v1/submissions/${submissionId}`);
      return res;
    } catch (error) {
      console.error('Error fetching request list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
