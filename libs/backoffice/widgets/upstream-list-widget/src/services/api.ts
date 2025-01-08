import { client, portalUrl } from '@oxygen/client';

import { GetUpstreamListResponseType, GetUpstreamServiceResponseType } from '../types';

const Api = {
  getUpstreamData: async (params) => {
    return client.get<GetUpstreamListResponseType>(`${portalUrl}/v1/upstreams`, { params: params });
  },
  getUpstreamServices: async (params) => {
    return client.get<GetUpstreamServiceResponseType>(`${portalUrl}/v1/upstreams/services/${params}`);
  },
  deleteUpstream: async (params) => {
    const res = await client.delete(`${portalUrl}/v1/upstreams/${params}`);
    return res;
  },
};
export default Api;
