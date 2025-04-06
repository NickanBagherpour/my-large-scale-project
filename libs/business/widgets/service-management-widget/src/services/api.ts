import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, TableResponseType } from '../types';

const Api = {
  getTableReportData: async (params: FetchParamsType) => {
    return client.get<TableResponseType>(`${portalUrl}/v1/service-fees`, { params });
  },
};
export default Api;
