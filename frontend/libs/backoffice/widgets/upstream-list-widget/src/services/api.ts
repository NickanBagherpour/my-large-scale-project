import { client, portalUrl } from '@oxygen/client';

import { ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';
import { UpstreamParamsType } from '@oxygen/types';

const Api = {
  getUpstreamData: async (params: UpstreamParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getUpstreams(params);
  },
};
export default Api;
