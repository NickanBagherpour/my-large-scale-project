import { API_PREFIX, client } from '@oxygen/client';

const Api = {
  geRequestData: async (submissionId: string) => {
    try {
      const res = await client.get(`${API_PREFIX.PORTAL}/v1/submissions/${submissionId}`);
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
};
export default Api;
