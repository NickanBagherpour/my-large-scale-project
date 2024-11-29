import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeChangeHistoryData: async (params: FetchParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getScopeChangeHistory(params);
  },
};
export default Api;
