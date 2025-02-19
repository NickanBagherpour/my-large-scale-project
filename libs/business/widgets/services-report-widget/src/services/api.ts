import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType } from '../types';
import { GetUpstreamListResponseType } from '../../../upstream-list-widget/src/types';

const Api = {
  getServicesReport: async (params: FetchParamsType) => {
    return client.get<GetUpstreamListResponseType>(`${portalUrl}/v1/upstreams`, { params });
  },
};
export default Api;
