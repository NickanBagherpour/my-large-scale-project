import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getUpstreamData: async (params: FetchParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getUpstreams(params);
  },
};
export default Api;
