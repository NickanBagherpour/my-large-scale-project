import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, TableResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getTableReportData: async (params: FetchParamsType) => {
    return client.get<TableResponseType>(`${portalUrl}/v1/services`, { params });
  },
};
export default Api;
