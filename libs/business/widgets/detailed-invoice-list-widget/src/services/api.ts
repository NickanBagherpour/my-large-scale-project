import { client, API_PREFIX } from '@oxygen/client';
import { Reports, ReportsParams } from '../types';

const Api = {
  getReports: async (params: ReportsParams) => {
    return client.get<Reports>(`${API_PREFIX.INVOICE}/v1/reports`, { params });
  },
};
export default Api;
