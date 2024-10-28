import type { ParamsType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getClientsListData: async (params: ParamsType) => {
    return Mockify.getClients(params);
  },

  getDraftsData: async () => {
    return Mockify.getDrafts();
  },
};
export default Api;
