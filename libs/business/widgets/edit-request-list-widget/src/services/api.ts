import { client, portalUrl } from '@oxygen/client';

const Api = {
  updateServiceDetails: async (params) => {
    const { submissionId, ...rest } = params;
    return client.get(`${portalUrl}/business/api/v1/services/${submissionId}`, { params: { ...rest } });
  },

  deleteService: async (params) => {
    const { serviceId } = params;
    return client.delete(`${portalUrl}/business/api/v1/services/${serviceId}`);
  },
};
export default Api;
