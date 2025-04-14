import { API_PREFIX, client } from '@oxygen/client';
import { Fee, GetServiceParams, PostTariffParams } from '../types';

const Api = {
  postServiceFee: async ({ serviceName, ...params }: PostTariffParams) => {
    return client.post(`${API_PREFIX.INVOICE}/v1/service-fees/service-name/${serviceName}`, params);
  },

  putServiceFee: async ({ serviceName, ...params }: PostTariffParams) => {
    return client.put(`${API_PREFIX.INVOICE}/v1/service-fees/service-name/${serviceName}`, params);
  },

  getServiceFee: async (params: GetServiceParams) => {
    return client.get<Fee>(`${API_PREFIX.INVOICE}/v1/service-fees/inquiry`, {
      params,
    });
  },
};

export default Api;
