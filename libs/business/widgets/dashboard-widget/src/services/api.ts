import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import { ChartResponse, ReportCardsResponse } from '../types/get-chart.type';

const Api = {
  getServiceChartData: async (type: number) => {
    return client.get<ChartResponse>(`${API_PREFIX.REPORT}/v1/chart`, { params: { type } });
  },
  getReportCardData: async () => {
    return client.get<ReportCardsResponse>(`${API_PREFIX.REPORT}/v1/reports/cards/ebank`);
  },
};
export default Api;
