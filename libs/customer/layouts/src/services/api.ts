import { API_PREFIX, client } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { ENV_CONSTANTS } from '@oxygen/utils';

const Api = {
  getMenu: async () => {
    const response = await Mockify.getCustomerMenu();
    return response.data;
  },
  getUserPhoto: async () => {
    const response = await client.get(`${API_PREFIX.PORTAL}/profile/photo`);
    return response.data;
  },
  getUserProfile: async () => {
    let response;
    if (ENV_CONSTANTS.IS_DEV) {
      response = await Mockify.getUserProfile();
    } else {
      response = await client.get(`${API_PREFIX.PORTAL}/profile`);
    }
    return response.data;
  },
};
export default Api;
