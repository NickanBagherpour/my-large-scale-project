import { client, portalUrl, reportUrl } from '@oxygen/client';

import { ClientReportDto, FetchParamsType, ReportResponseType } from '../types';
import { ParamsType, ClientReportsDto, ClientServicesDto } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },

  getClientReportList: async (params: ParamsType) => {
    return client.get<ClientReportsDto>(`${reportUrl}/v1/reports/clients`, { params });
  },

  getClientServicesList: async (clientRecord: ClientReportDto) => {
    const clientName = clientRecord.clientEnName;
    return client.get<ClientServicesDto>(`${reportUrl}/v1/reports/clients/${clientName}/services`);
  },
};
export default Api;
