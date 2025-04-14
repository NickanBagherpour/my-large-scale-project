import { API_PREFIX, client } from '@oxygen/client';
import { CreateScopeType } from '../types';

const Api = {
  createScope: async (params: CreateScopeType) => {
    return client.post(`${API_PREFIX.PUBLISHER}/v1/scope`, params);
  },
};
export default Api;
