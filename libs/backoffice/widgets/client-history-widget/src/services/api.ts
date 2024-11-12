import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getClientHistory(params);
  },
};
export default Api;
