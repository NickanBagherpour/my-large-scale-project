import type { Pagination } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeList: async (params: Pagination) => Mockify.getScopesList(params),
};
export default Api;
