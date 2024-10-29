import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';

const Api = {
  getClientInfoData: async () => Mockify.getClientInfo(),
  getServicesData: async (params: Pagination) => Mockify.getServices(params),
};
export default Api;
