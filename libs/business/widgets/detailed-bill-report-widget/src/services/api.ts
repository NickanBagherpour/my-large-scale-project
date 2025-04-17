import { API_PREFIX, client } from '@oxygen/client';
import { FinancialReportData, InfoData, InfoParams, NonfinancialReportData, ReportParams } from '../types';

const Api = {
  getInfo: async (params: InfoParams) => {
    return client.get<InfoData>(`${API_PREFIX.INVOICE}/v1/reports/info`, { params });
  },

  getFinancialReport: async (params: ReportParams) => {
    return client.get<FinancialReportData>(`${API_PREFIX.INVOICE}/v1/reports/financial`, {
      params,
    });
  },

  getNonfinancialReport: async (params: ReportParams) => {
    return client.get<NonfinancialReportData>(`${API_PREFIX.INVOICE}/v1/reports/non-financial`, {
      params,
    });
  },
};
export default Api;
