import { API_PREFIX, client } from '@oxygen/client';
// import { ENV_CONSTANTS } from '@oxygen/utils';
import Mockify from '@oxygen/mockify';

const Api = {
  getMenus: async () => {
    const response = await Mockify.getBakofficeMenu();
    return response.data;
  },
  getUserPhoto: async () => {
    const response = await client.get(`${API_PREFIX.AUTH}/profile/photo`);
    return response.data;
  },
  getUserProfile: async () => {
    const response = await client.get(`api/auth/user-info`);
    return response.data;
  },
};
export default Api;
