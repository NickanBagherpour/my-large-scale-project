import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { ENV_CONSTANTS } from '@oxygen/utils';

const Api = {
  getBusinessMenu: async () => {
    let response;
    if (ENV_CONSTANTS.IS_DEV) {
      response = await Mockify.getBusinessMenu();
    } else {
      response = await client.get(`${portalUrl}/profile/menu`);
    }
    return response.data;
  },
  getUserPhoto: async () => {
    const response = await client.get(`${portalUrl}/profile/photo`);
    return response.data;
  },
  getUserOrg: async (params?) => {
    const response = await client.get(`${portalUrl}/profile/organizations`, {
      params: params,
    });
    return response.data;
  },
  changeOrg: async (orgId) => {
    const response = await client.patch(`api/organizations/change/${orgId}`);
    return response.data;
  },
  getUserProfile: async () => {
    const response = await client.get(`api/auth/user-info`);
    return response.data;
  },
};
export default Api;
