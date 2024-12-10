import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import type { Pagination } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getRequestList: async (params: Pagination) => Mockify.getRequestList(params),
};
export default Api;
