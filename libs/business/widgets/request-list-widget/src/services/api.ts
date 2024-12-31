import { client, portalUrl } from '@oxygen/client';

const Api = {
  getRequestList: async (params) => client.get(`${portalUrl}/v1/submissions/search`, { params }),
};
export default Api;
