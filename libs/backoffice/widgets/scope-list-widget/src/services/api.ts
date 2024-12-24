import { client, portalUrl } from '@oxygen/client';
import { typeScopeListParams } from '@oxygen/types';

const Api = {
  getScopeList: async (params: typeScopeListParams) => client.get(`${portalUrl}/v1/scope`, { params }),
};
export default Api;
