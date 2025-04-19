import { API_PREFIX, client } from '@oxygen/client';
import { ApiUtil } from '@oxygen/utils';

const Api = {
  getRequestList: async (params) => {
    const { role, ...restParams } = params;
    const rolePrefix = ApiUtil.getApiPrefix(role);
    return client.get(`${rolePrefix}/v1/submissions/search`, { params: restParams });
  },
};
export default Api;
