import { client, API_PREFIX } from '@oxygen/client';
import { EditUpstreamParamsType } from '../types';

const Api = {
  getUpstreamDetailsList: async (upstreamName: string | null) => {
    try {
      const res = await client.get(`${API_PREFIX.PUBLISHER}/v1/upstreams/${upstreamName}`);
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  addServerToUpstream: async (params: { upstreamName: string; domain: string; weight: number; id?: number }) => {
    const { upstreamName, id, ...restParams } = params;
    const editParams = { id: id, domain: restParams.domain, weight: restParams.weight };

    if (id) {
      return client.put(`${API_PREFIX.PUBLISHER}/v1/targets`, editParams, {
        headers: {},
      });
    } else {
      return client.post(`${API_PREFIX.PUBLISHER}/v1/targets/upstream-name/${upstreamName}`, restParams, {
        headers: {},
      });
    }
  },

  deleteServerFromUpstream: async (id: number) => {
    return client.delete(`${API_PREFIX.PUBLISHER}/v1/targets/${id}`);
  },

  putEditUpstream: async (params: EditUpstreamParamsType) => {
    return client.put(`${API_PREFIX.PUBLISHER}/v1/upstreams`, { ...params });
  },
};
export default Api;
