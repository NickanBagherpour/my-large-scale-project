import { API_PREFIX, client } from '@oxygen/client';

import { ChartResponse, ReportCardsResponse } from '../types/get-chart.type';

const Api = {
  getServiceChartData: async (type: number) => {
    return client.get<ChartResponse>(`${API_PREFIX.REPORT}/v1/chart`, { params: { type } });
  },
  getReportCardData: async () => {
    return client.get<ReportCardsResponse>(`${API_PREFIX.REPORT}/v1/reports/cards/ebank`);
  },
  getFeeDistribution: async () => {
    return client.get<any>(`${API_PREFIX.REPORT}/v1/reports/invoice/financial-fee-distribution`);
  },
  getStatusDistribution: async () => {
    return client.get<any>(`${API_PREFIX.COMMERCIAL}/v1/reports/status-distribution`);
  },
  getMostValuableAggrigator: async () => {
    return client.get<any>(`${API_PREFIX.COMMERCIAL}/v1/reports/dashboard/aggregator`);
  },
  getTopMetrics: async () => {
    return client.get<any>(`${API_PREFIX.COMMERCIAL}/v1/reports/dashboard/aggregator`);
  },
};
export default Api;
