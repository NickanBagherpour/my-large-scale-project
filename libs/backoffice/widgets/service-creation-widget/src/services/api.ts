import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { PostServiceParams, Service, ServiceParams } from '../types';

const Api = {
  getScopes: Mockify.getScopes,
  getService: async ({ name }: ServiceParams) => client.get<Service>(`${portalUrl}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<Service>(`${portalUrl}/v1/services`, params),
};
export default Api;
