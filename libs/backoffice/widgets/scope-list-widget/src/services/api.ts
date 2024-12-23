import { client, portalUrl } from '@oxygen/client';

const Api = {
  getScopeList: async (params) => client.get(`${portalUrl}/v1/scope`, { params }),
};
export default Api;
