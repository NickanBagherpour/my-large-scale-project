import Mockify from '@oxygen/mockify';
import { client, portalUrl } from '@oxygen/client';

import { ParamsType, FirstStepParams } from '../types';

const Api = {
  // getUpstreamDetailsList: async (params: ParamsType) => {
  //   // const res = Mockify.getUpstreamDetails(params);
  //   // return res;
  // },

  getUpstreamDetailsList: async (upstreamName: string | null) => {
    // debugger;
    try {
      const res = await client.get(`${portalUrl}/v1/upstreams/${upstreamName}`);
      // debugger;
      return res;
    } catch (error) {
      console.error('Error fetching organization list:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },

  upstreamInfoRegistrationFirstStep: async (params: FirstStepParams) => {
    debugger;
    const { name, persian_name } = params;
    // const updatedParams = {
    //   name: name,
    //   description: persian_name,
    // };
    return client.post(
      `${portalUrl}/v1/upstreams`,
      params,
      // { name, description: persian_name },
      {
        headers: {},
      }
    );
    // if (organizationId && submissionId) {
    //   return client.put(`${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`, restParams, {
    //     headers: {},
    //   });
    // } else {
    //   return client.post(`${portalUrl}/v1/organizations`, restParams, {
    //     headers: {},
    //   });
    // }
  },

  addServerToUpstream: async (params: { upstreamName: string; domain: string; weight: number; id?: number }) => {
    debugger;
    const { upstreamName, id, ...restParams } = params;
    const editParams = { id: id, domain: restParams.domain, weight: restParams.weight };
    // const updatedParams = {
    //   name: name,
    //   description: persian_name,
    // };
    if (id) {
      return client.put(
        `${portalUrl}/v1/targets`,
        editParams,
        // { name, description: persian_name },
        {
          headers: {},
        }
      );
    } else {
      return client.post(
        `${portalUrl}/v1/targets/upstream-name/${upstreamName}`,
        restParams,
        // { name, description: persian_name },
        {
          headers: {},
        }
      );
    }

    // if (organizationId && submissionId) {
    //   return client.put(`${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`, restParams, {
    //     headers: {},
    //   });
    // } else {
    //   return client.post(`${portalUrl}/v1/organizations`, restParams, {
    //     headers: {},
    //   });
    // }
  },

  deleteServerFromUpstream: async (id: number) => {
    debugger;

    return client.delete(`${portalUrl}/v1/targets/${id}`);

    // if (organizationId && submissionId) {
    //   return client.put(`${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`, restParams, {
    //     headers: {},
    //   });
    // } else {
    //   return client.post(`${portalUrl}/v1/organizations`, restParams, {
    //     headers: {},
    //   });
    // }
  },

  addServer: async (params: FirstStepParams) => {
    debugger;
    // const { name, persian_name } = params;
    const updatedParams = {
      weight: 10,
      domain: 'test',
    };
    return client.post(
      `${portalUrl}/v1/targets/upstream-name/mohsen2`,

      updatedParams,
      // { name, description: persian_name },
      {
        headers: {},
      }
    );
    // if (organizationId && submissionId) {
    //   return client.put(`${portalUrl}/v1/organizations/${organizationId}/submissions/${submissionId}`, restParams, {
    //     headers: {},
    //   });
    // } else {
    //   return client.post(`${portalUrl}/v1/organizations`, restParams, {
    //     headers: {},
    //   });
    // }
  },
};
export default Api;
