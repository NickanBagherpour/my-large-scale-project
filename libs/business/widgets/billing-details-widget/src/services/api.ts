import { API_PREFIX, client } from '@oxygen/client';
import { TariffDetailsType } from '../types';

const Api = {
  getReportData: async (serviceName: string) => {
    return client.get<TariffDetailsType>(`${API_PREFIX.INVOICE}/v1/service-fees/service-name/${serviceName}`);
  },
};
export default Api;
