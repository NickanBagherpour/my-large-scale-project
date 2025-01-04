import { client, portalUrl } from '@oxygen/client';

const Api = {
  createScope: async (params: any) => {
    return client.post(`${portalUrl}/v1/scope`, params);
  },
};
export default Api;
