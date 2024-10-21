import type { ParamsType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getClientsListData: async (params: ParamsType) => {
    return Mockify.getClients(params);
  },
};
export default Api;
