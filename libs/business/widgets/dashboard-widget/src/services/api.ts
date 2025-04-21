import { API_PREFIX, client } from '@oxygen/client';

import { ChartResponse } from '../types/get-chart.type';
import { ReportCardsResponse } from '../types/get-report-card.type';
import { aggregatorResponse } from '../types/get-aggregator.type';
import { FeeDistributionResponse } from '../types/get-fee-distribution.type';
import { RequestStatusResponse } from '../types/get-request-status.type';

const Api = {
  getServiceChartData: async (type: number) => {
    return client.get<ChartResponse>(`${API_PREFIX.REPORT}/v1/chart`, { params: { type } });
  },
  getReportCardData: async () => {
    return client.get<ReportCardsResponse>(`${API_PREFIX.REPORT}/v1/reports/cards/ebank`);
  },
  getFeeDistribution: async () => {
    return client.get<FeeDistributionResponse>(`${API_PREFIX.REPORT}/v1/reports/invoice/financial-fee-distribution`);
  },
  getRequestStatusDistribution: async () => {
    return client.post<RequestStatusResponse>(`${API_PREFIX.COMMERCIAL}/v1/reports/status-distribution`);
  },
  getMostValuableAggregator: async () => {
    return client.get<aggregatorResponse>(`${API_PREFIX.COMMERCIAL}/v1/dashboard/aggregator`);
  },
};
export default Api;
