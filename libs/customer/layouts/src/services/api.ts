import { client, portalUrl } from '@oxygen/client';
import mockify from '@oxygen/mockify';
import { ENV_CONSTANTS } from '@oxygen/utils';

const Api = {
  getMenus: async () => {
    let response;
    if (ENV_CONSTANTS.IS_DEV) {
      response = await mockify.getMenus();
    } else {
      response = await client.get(`${portalUrl}/profile/menu`);
    }
    return response.data;
  },
  getCustomerMenus: async () => {
    let response;
    if (ENV_CONSTANTS.IS_DEV) {
      response = await mockify.getCustomerMenus();
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
    let response;
    if (ENV_CONSTANTS.IS_DEV) {
      response = await mockify.getUserProfile();
    } else {
      response = await client.get(`${portalUrl}/profile`);
    }
    return response.data;
  },
};
export default Api;
