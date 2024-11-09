import Mockify from '@oxygen/mockify';

import { ParamsType } from '../types';

const Api = {
  getServicesList: async (params: ParamsType) => {
    const res = Mockify.getServicesList(params);
    return res;
  },

  getDraftsData: async () => {
    return Mockify.getServicesDrafts();
  },
};
export default Api;
