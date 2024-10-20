import { ApiUtil } from '@oxygen/utils';

import { Api } from '../services';
import { SaleParams } from '../services';

export const postSaleReciept = async (params: SaleParams) => {
  try {
    const response = await Api.postSaleReciept(params);
    return response;
  } catch (reason) {
    throw ApiUtil.getErrorMessage(reason);
  }
};
