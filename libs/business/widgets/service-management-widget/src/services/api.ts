import { client, portalUrl } from '@oxygen/client';

import { getTableReportParamsType, TableResponseType } from '../types';

const Api = {
  getTableReportData: async (params: getTableReportParamsType) => {
    return client.get<TableResponseType>(`${portalUrl}/management/api/v1/services`, { params });
  },
};
export default Api;
