import { client } from '@oxygen/client';
import { PostTariffParams } from '../types/service.type';

// /invoice/api/v1/service-fees/service-name/{service-name}

const prefix = '/invoice/api';

const Api = {
  postServiceFee: async ({ serviceName, ...params }: PostTariffParams) => {
    return client.post(`${prefix}/v1/service-fees/service-name/${serviceName}`, params);
  },
};

export default Api;
