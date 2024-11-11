import Mockify from '@oxygen/mockify';

import { ParamsType } from '../types';

const Api = {
  getUpstreamDetailsList: async (params: ParamsType) => {
    const res = Mockify.getUpstreamDetails(params);
    return res;
  },
};
export default Api;
