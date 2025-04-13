import Mockify from '@oxygen/mockify';
import { FetchParamsType } from '../types';
import { API_PREFIX, client } from '@oxygen/client';

const Api = {
  getRouteHistory: async (params) => {
    return client.get(`${API_PREFIX.PUBLISHER}/v1/routes/610/history`);
  },
};
export default Api;
