import { client, portalUrl } from '@oxygen/client';
// import { ENV_CONSTANTS } from '@oxygen/utils';
import Mockify from '@oxygen/mockify';

const Api = {
  getMenus: async () => {
    const response;
    // if (ENV_CONSTANTS.IS_DEV) {
    response = await Mockify.getBakofficeMenu();
    //  } else {
    //   response = await client.get(`${portalUrl}/profile/menu`);
    // }
    return response.data;
  },
  getUserPhoto: async () => {
    const response = await client.get(`${portalUrl}/profile/photo`);
    return response.data;
  },
  getUserProfile: async () => {
    const response = await client.get(`api/auth/user-info`);
    return response.data;
  },
};
export default Api;
