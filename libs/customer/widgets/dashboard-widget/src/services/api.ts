import { client, API_PREFIX } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${API_PREFIX.CUSTOMER}/v1/redemption/report`, params);
  },
};
export default Api;
