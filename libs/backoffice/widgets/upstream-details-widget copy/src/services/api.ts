import Mockify from '@oxygen/mockify';
import { client, portalUrl } from '@oxygen/client';

import { ParamsType, FirstStepParams } from '../types';

const Api = {
  getUpstreamDetailsList: async (params: ParamsType) => {
    const res = Mockify.getUpstreamDetails(params);
    return res;
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
