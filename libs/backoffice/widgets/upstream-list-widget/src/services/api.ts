import { client, portalUrl } from '@oxygen/client';

import { GetUpstreamListResponseType, GetUpstreamTargetResponseType } from '../types';

const Api = {
  getUpstreamData: async (params) => {
    return client.get<GetUpstreamListResponseType>(`${portalUrl}/v1/upstreams`, { params: params });
  },
  getUpstreamTarget: async (params) => {
    return client.get<GetUpstreamTargetResponseType>(`${portalUrl}/v1/upstreams/${params}`);
  },
  deleteUpstream: async (params) => {
    const res = await client.delete(`${portalUrl}/v1/upstreams/${params}`);
    return res;
  },
};
export default Api;
