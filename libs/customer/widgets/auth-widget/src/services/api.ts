import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getCaptcha: async () => {
    return client.get<ReportResponseType>(`http://192.168.54.181:8080/api/v1/captcha`);
  },
};
export default Api;
