import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getScopeChangeHistoryData: async (params: FetchParamsType) => {
    console.log(Mockify.getScopeChangeHistory(params), 'dddd');

    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getScopeChangeHistory(params);
  },
  // getScopeChangeHistoryData: async (params: FetchParamsType) => Mockify.getScopeChangeHistory(params),
};
export default Api;
