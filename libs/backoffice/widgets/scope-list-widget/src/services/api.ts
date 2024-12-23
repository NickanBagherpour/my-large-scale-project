import { Pagination } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeList: async (params: Pagination) => Mockify.getScopesList(params),

  // getScopeList: async (params) => client.get(`${portalUrl}/v1/scope`, { params }),
};
export default Api;
