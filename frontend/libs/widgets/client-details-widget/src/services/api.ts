import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';

const Api = {
  getClientInfoData: async () => Mockify.getClientInformation(),
  getServicesData: async (params: Pagination) => Mockify.getServices(params),
  getPluginsData: async () => Mockify.getPlugins(),
};
export default Api;
