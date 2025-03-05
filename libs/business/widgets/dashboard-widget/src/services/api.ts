import { client, portalUrl, reportUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ChartResponse, ReportCardsResponse } from '../types/get-chart.type';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceChartData: async (type: number) => {
    return client.get<ChartResponse>(`${reportUrl}/v1/chart`, { params: { type } });
  },
  getReportCardData: async () => {
    return client.get<ReportCardsResponse>(`${reportUrl}/v1/reports/cards/ebank`);
  },
};
export default Api;
