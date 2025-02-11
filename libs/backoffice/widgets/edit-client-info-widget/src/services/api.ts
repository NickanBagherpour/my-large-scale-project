import { client, portalUrl } from '@oxygen/client';
import { Nullable } from '@oxygen/types';

const Api = {
  postClient: async (params) => {
    return client.post(`${portalUrl}/v1/clients`, params);
  },
  getTagsInfo: async () => {
    return client.get(`${portalUrl}/v1/tags/client`);
  },
  getClientInfo: async (reqId: Nullable<string>) => {
    return client.get(`${portalUrl}/v1/clients/${reqId}`);
  },
  getClientType: async () => {
    return client.get(`${portalUrl}/v1/enums/client-types`);
  },
};
export default Api;
