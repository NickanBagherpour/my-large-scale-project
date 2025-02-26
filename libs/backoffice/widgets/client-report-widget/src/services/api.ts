import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ClientReportParamsType, ClientReportsDto } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getClientReportList: async (params: ClientReportParamsType) => {
    return client.get<ClientReportsDto>(`${portalUrl}/v1/clients`, { params });
  },
};
export default Api;
