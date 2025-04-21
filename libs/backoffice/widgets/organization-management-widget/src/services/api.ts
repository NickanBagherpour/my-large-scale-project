import { client, API_PREFIX } from '@oxygen/client';

import { OrganizationParamsType } from '../types';

const Api = {
  postNewOrganization: async (params: OrganizationParamsType) => {
    return client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/organization`, { ...params });
  },

  getOrganizationInfo: async (params) => await client.get(`${API_PREFIX.PUBLISHER}/v1/organization`, { params }),
};
export default Api;
