import { client, portalUrl, reportUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ParamsType, ClientReportsDto } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getClientReportList: async (params: ParamsType) => {
    return client.get<ClientReportsDto>(`${reportUrl}/v1/reports/clients`, { params });
  },
};
export default Api;
