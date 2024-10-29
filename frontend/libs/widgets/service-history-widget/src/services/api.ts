import Mockify from '@oxygen/mockify';
import { FetchParamsType } from '../types';

const Api = {
  // getServiceHistoryData: async (params: FetchParamsType) => {
  //   return client.post<ServiceHistoryResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServiceHistoryData: async (params: FetchParamsType) => {
    return Mockify.getServiceHistory(params);
  },
};
export default Api;
