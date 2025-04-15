import { API_PREFIX, client } from '@oxygen/client';
import { FinancialReportData, InfoData, InfoParams, NonfinancialReportData, ReportParams } from '../types';

const Api = {
  getInfo: async (params: InfoParams) => {
    return client.get<InfoData>(`${API_PREFIX.INVOICE}/v1/reports/info`, { params });
  },

  getFinancialReport: async ({ gatewayId, ...params }: ReportParams) => {
    return client.get<FinancialReportData>(`${API_PREFIX.INVOICE}/v1/reports/clients/${gatewayId}/financial`, {
      params,
    });
  },

  getNonfinancialReport: async ({ gatewayId, ...params }: ReportParams) => {
    return client.get<NonfinancialReportData>(`${API_PREFIX.INVOICE}/v1/reports/clients/${gatewayId}/non-financial`, {
      params,
    });
  },
};
export default Api;
