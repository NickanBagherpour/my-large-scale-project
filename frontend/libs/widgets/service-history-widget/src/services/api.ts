import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ServiceHistoryResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  // getServiceHistoryData: async (params: FetchParamsType) => {
  //   return client.post<ServiceHistoryResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServiceHistoryData: async (params: FetchParamsType) => {
    return Mockify.getServiceHistory(params);
  },
};
export default Api;
