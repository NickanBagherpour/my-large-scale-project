import { client, portalUrl } from '@oxygen/client';
import { CreateScopeType } from '../types';

const Api = {
  createScope: async (params: CreateScopeType) => {
    return client.post(`${portalUrl}/v1/scope`, params);
  },
};
export default Api;
