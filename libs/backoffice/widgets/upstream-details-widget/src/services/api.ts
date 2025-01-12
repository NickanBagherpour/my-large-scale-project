import { client, portalUrl } from '@oxygen/client';

const Api = {
  getUpstreamDetailsList: async (upstreamName: string | null) => {
    try {
      const res = await client.get(`${portalUrl}/v1/upstreams/${upstreamName}`);
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
      return client.put(`${portalUrl}/v1/targets`, editParams, {
        headers: {},
      });
    } else {
      return client.post(`${portalUrl}/v1/targets/upstream-name/${upstreamName}`, restParams, {
        headers: {},
      });
    }
  },

  deleteServerFromUpstream: async (id: number) => {
    return client.delete(`${portalUrl}/v1/targets/${id}`);
  },
};
export default Api;
