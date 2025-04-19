import { API_PREFIX, client } from '@oxygen/client';

import { ClientReportDto, FetchParamsType, ReportResponseType } from '../types';
import { ParamsType, ClientReportsDto, ClientServicesDto } from '../types';

const Api = {
  getClientReportList: async (params: ParamsType) => {
    return client.get<ClientReportsDto>(`${API_PREFIX.REPORT}/v1/reports/clients`, { params });
  },

  getClientServicesList: async (clientRecord: ClientReportDto) => {
    const clientName = clientRecord.clientEnName;
    return client.get<ClientServicesDto>(`${API_PREFIX.REPORT}/v1/reports/clients/${clientName}/services`);
  },
};
export default Api;
