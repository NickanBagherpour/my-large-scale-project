import { RequestParamsType } from '@oxygen/types';
import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${API_PREFIX.CUSTOMER}/v1/redemption/report`, params);
  },

  getRequestsListData: async (params: RequestParamsType) => {
    // Initialize filteredParams with the searchTerm
    const filteredParams: any = {};

    if (params.searchTerm) {
      filteredParams.orgName = params.searchTerm;
    }

    if (params.sort) {
      filteredParams.sort = params.sort;
    }

    if (params.status) {
      filteredParams.searchStatusSet = params.status;
    }

    // if (Array.isArray(params.status)) {
    //   params.status.forEach((status) => {
    //     if (!filteredParams.searchStatusSet) {
    //       filteredParams.searchStatusSet = [];
    //     }
    //     (filteredParams.searchStatusSet as string[]).push(status);
    //   });
    // } else {
    //   filteredParams.searchStatusSet = params.status;
    // }

    try {
      const queryString = new URLSearchParams(filteredParams).toString();
      const res = await client.get(`${API_PREFIX.CUSTOMER}/v1/submissions/search?${queryString}`);
      // const res = await client.get(`${API_PREFIX.CUSTOMER}/v1/submissions/search?`, { params: filteredParams });
      return res;
    } catch (error) {
      console.error('Error fetching request list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  getRequestDraftListData: async () => {
    try {
      const res = await client.get(`${API_PREFIX.CUSTOMER}/v1/submissions/drafts`);
      return res;
    } catch (error) {
      console.error('Error fetching requests drafts list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  deleteSelectedRequest: async (submissionId: number) => {
    try {
      const res = await client.delete(`${API_PREFIX.CUSTOMER}/v1/submissions/${submissionId}`);
      return res;
    } catch (error) {
      console.error('Error fetching request list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
