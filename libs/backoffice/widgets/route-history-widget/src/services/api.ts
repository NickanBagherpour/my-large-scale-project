import Mockify from '@oxygen/mockify';
import { FetchParamsType } from '../types';
import { client, portalUrl } from '@oxygen/client';

const Api = {
  getRouteHistory: async (params) => {
    return client.get(`${portalUrl}/v1/routes/610/history`);
  },
};
export default Api;
