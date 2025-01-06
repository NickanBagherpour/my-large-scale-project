import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  geRequestData: async (submissionId: string) => {
    try {
      const res = await client.get(`${portalUrl}/v1/submissions/${submissionId}`);
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
