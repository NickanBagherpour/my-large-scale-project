import { client, API_PREFIX } from '@oxygen/client';

import { CreateUpstreamParamsType, GetUpstreamListResponseType, GetUpstreamServiceResponseType } from '../types';

const Api = {
  getUpstreamData: async (params) => {
    return client.get<GetUpstreamListResponseType>(`${API_PREFIX.PUBLISHER}/v1/upstreams`, { params });
  },
  getUpstreamServices: async (params) => {
    return client.get<GetUpstreamServiceResponseType>(`${API_PREFIX.PUBLISHER}/v1/upstreams/services/${params}`);
  },
  deleteUpstream: async (params) => {
    const res = await client.delete(`${API_PREFIX.PUBLISHER}/v1/upstreams/${params}`);
    return res;
  },
  postCreateUpstream: async (params: CreateUpstreamParamsType) => {
    return client.post(`${API_PREFIX.PUBLISHER}/v1/upstreams`, { ...params });
  },
};
export default Api;
