import { client, invoiceUrl } from '@oxygen/client';
import { Fee, PostTariffParams } from '../types';

const Api = {
  postServiceFee: async ({ serviceName, ...params }: PostTariffParams) => {
    return client.post(`${invoiceUrl}/v1/service-fees/service-name/${serviceName}`, params);
  },

  putServiceFee: async ({ serviceName, ...params }: PostTariffParams) => {
    return client.put(`${invoiceUrl}/v1/service-fees/service-name/${serviceName}`, params);
  },

  getServiceFee: async (serviceName: string) => {
    return client.get<Fee>(`${invoiceUrl}/v1/service-fees/service-name/${serviceName}`);
  },
};

export default Api;
