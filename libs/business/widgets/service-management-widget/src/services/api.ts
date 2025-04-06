import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, TableResponseType } from '../types';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.get<TableResponseType>(`${portalUrl}/v1/redemption/report`, { params });
  },
};
export default Api;
