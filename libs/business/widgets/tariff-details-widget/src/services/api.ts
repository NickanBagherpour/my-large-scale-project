import { client, invoiceUrl } from '@oxygen/client';
import { TariffDetailsType } from '../types';

const Api = {
  getReportData: async (serviceName: string) => {
    return client.get<TariffDetailsType>(`${invoiceUrl}/v1/service-fees/service-name/${serviceName}`);
  },
};
export default Api;
