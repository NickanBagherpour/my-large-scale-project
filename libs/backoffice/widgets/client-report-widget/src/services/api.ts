import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ClientReportParamsType, ClientReportsDto } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${API_PREFIX.PUBLISHER}/v1/redemption/report`, params);
  },

  getClientReportList: async (params: ClientReportParamsType) => {
    return client.get<ClientReportsDto>(`${API_PREFIX.PUBLISHER}/v1/clients`, { params });
  },
};
export default Api;
