import { RequestParamsType } from '@oxygen/types';
import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getRequestsListData: async (params: RequestParamsType) => {
    // Initialize filteredParams with the searchTerm
    const filteredParams: { [key: string]: string | number | string[] | number[] } = {
      orgName: params.searchTerm,
      sort: params.sort,
      searchStatusSet: params.status,
    };

    try {
      const res = await client.get(`${portalUrl}/v1/submissions/search?`, { params: filteredParams });
      return res;
    } catch (error) {
      console.error('Error fetching request list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  getRequestDraftListData: async () => {
    try {
      const res = await client.get(`${portalUrl}/v1/submissions/drafts`);
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
