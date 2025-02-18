import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ParamsType, ClientReportsDto } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getClientReportList: async (params: ParamsType) => {
    return client.get<ClientReportsDto>(`${portalUrl}/v1/services`, { params });
  },
};
export default Api;
