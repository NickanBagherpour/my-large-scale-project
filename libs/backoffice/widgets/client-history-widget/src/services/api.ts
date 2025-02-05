import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { ClientHistoryResponseType, FetchClientHistoryParamsType } from '../types';

const Api = {
  // getClientHistoryData: async (params: FetchClientHistoryParamsType) => {
  //   const {clientId,...restParams} = params;
  //   return client.get<ClientHistoryResponseType>(`${portalUrl}/v1/clients/history/${clientId}`, { ...restParams });
  //   // return Mockify.getClientHistory(params);
  // },
};
export default Api;
