import { client, portalUrl } from '@oxygen/client';
import { ScopeRequestParams } from '../types';

const Api = {
  getScopeList: async (params: ScopeRequestParams) => client.get(`${portalUrl}/v1/scope`, { params }),
};
export default Api;
