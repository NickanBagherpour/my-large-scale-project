import Mockify from '@oxygen/mockify';
import type { ParamsType } from '@oxygen/types';

const Api = {
  getClientsListData: async (params: ParamsType) => {
    return Mockify.getClients(params);
  },

  getDraftsData: async () => {
    return Mockify.getDrafts();
  },
};
export default Api;
