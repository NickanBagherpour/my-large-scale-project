import { API_PREFIX, client } from '@oxygen/client';
// import { cities, getAccountAmount, getCustomerAccounts } from '@oxygen/mockify';
import { ApiUtil } from '@oxygen/utils';

import { SaleParams } from './types';

const Api = {
  getAccountInfo: async (params) => {
    const { accountNo, ...restParams } = params;
    const response = await client.get(`${API_PREFIX.PORTAL}/v1/account-info/${accountNo}`);
    return response.data;
  },
  postSaleReciept: async (params: SaleParams) => {
    const { url, transactionId } = params;
    const response = await client.post(`${API_PREFIX.PORTAL}/v1/${url}`, { transactionId });
    return response.data;
  },
};
export default Api;
