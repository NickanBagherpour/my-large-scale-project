import { portalUrl, client } from '@oxygen/client';
import Mockify from '@oxygen/mockify';

const Api = {
  getRequestList: async (params) => {
    const response = await Mockify.getRequestList(params);
    // const response = await client.get(portalUrl + '/request-management/requests');
    return response.data;
  },
  getTags: async () =>
    client.get(`${portalUrl}/v1/submissions/search`, {
      params: {
        page: 0,
        size: 10,
        sort: '',
      },
    }),
};
export default Api;
