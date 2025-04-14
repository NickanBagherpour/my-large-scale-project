import { client } from '@oxygen/client';
import Mockify from '@oxygen/mockify';

const Api = {
  getBusinessMenu: async () => {
    const response = await Mockify.getBusinessMenu();
    // response = await client.get(`${API_PREFIX.PORTAL}/profile/menu`);

    return response.data;
  },
  getUserProfile: async () => {
    const response = await client.get(`api/auth/user-info`);
    return response.data;
  },
};
export default Api;
