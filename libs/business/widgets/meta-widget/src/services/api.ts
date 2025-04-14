import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${API_PREFIX.META}/v1/redemption/report`, params);
  },
};
export default Api;
