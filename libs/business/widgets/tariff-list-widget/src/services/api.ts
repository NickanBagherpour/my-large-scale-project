import { client, portalUrl } from '@oxygen/client';

const Api = {
  getTariffListData: async (params) => {
    //TODO: set type of response and params after api is be ready
    return client.post<any>(`${portalUrl}/v1/redemption/report`, params);
  },
};
export default Api;
