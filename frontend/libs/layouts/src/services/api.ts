import { client, portalUrl } from '@oxygen/client';
import { isDevelop } from '@oxygen/utils';
import { getMenus } from '@oxygen/mockify';

const Api = {
  getMenus: async () => {
    let response;
    if (isDevelop) {
      response = await getMenus();
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
    const response = await client.get(`${portalUrl}/profile`);
    return response.data;
  },
};
export default Api;
