import { client, portalUrl } from '@oxygen/client';

const Api = {
  postClient: async (params) => {
    return client.post<any>(`${portalUrl}/v1/clients`, params);
  },
  getTagsInfo: async () => {
    return client.get<any>(`${portalUrl}/v1/tags/client`);
  },
  getClientInfo: async (reqId) => {
    return client.get<any>(`${portalUrl}/v1/clients/${reqId}`);
  },
  getClientType: async () => {
    return client.get<any>(`${portalUrl}/v1/enums/client-types`);
  },
};
export default Api;
