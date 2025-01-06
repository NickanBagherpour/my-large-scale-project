import { client, portalUrl } from '@oxygen/client';
import { TypeScopeListParams } from '../types';

const Api = {
  getScopeList: async (params: TypeScopeListParams) => client.get(`${portalUrl}/v1/scope`, { params }),
};
export default Api;
