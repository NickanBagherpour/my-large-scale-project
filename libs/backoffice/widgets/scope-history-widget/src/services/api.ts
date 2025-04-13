import { client, API_PREFIX } from '@oxygen/client';

import { FetchParamsType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeChangeHistoryData: async (params: FetchParamsType) => {
    // return client.post<ReportResponseType>(`${API_PREFIX.PUBLISHER}/v1/redemption/report`, params);
    return Mockify.getScopeChangeHistory(params);
  },
};
export default Api;
