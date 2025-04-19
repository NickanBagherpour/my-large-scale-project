import { API_PREFIX, client } from '@oxygen/client';

const Api = {
  updateServiceDetails: async (params) => {
    const { submissionId, ...rest } = params;
    return client.get(`${API_PREFIX.BUSINESS}/v1/services/${submissionId}`, { params: { ...rest } });
  },

  deleteService: async (params) => {
    return client.delete(`${API_PREFIX.BUSINESS}/v1/services/${params}`);
  },
};
export default Api;
