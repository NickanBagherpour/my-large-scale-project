import { client, API_PREFIX } from '@oxygen/client';
import { ApiUtil } from '@oxygen/utils';

import { GetInvoiceListResponseType } from '../types';

const Api = {
  getInvoiceList: async (params) => {
    const { role, ...restParams } = params;

    const rolePrefix = ApiUtil.getApiPrefix(role);

    return client.get<GetInvoiceListResponseType>(`${API_PREFIX.INVOICE}/v1/billings`, { params: restParams });
  },
  postCreateBill: async (params: any) => {
    return client.post(`${API_PREFIX.INVOICE}/v1/billings/client`, { ...params });
  },
};
export default Api;
