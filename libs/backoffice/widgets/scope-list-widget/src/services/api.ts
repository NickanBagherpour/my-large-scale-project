import { API_PREFIX, client } from '@oxygen/client';
import { ScopeRequestParams } from '../types';

const Api = {
  getScopeList: async (params: ScopeRequestParams) => client.get(`${API_PREFIX.PUBLISHER}/v1/scope`, { params }),
};
export default Api;
