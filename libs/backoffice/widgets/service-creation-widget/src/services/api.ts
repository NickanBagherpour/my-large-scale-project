import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { PostServiceParams, Route, Service } from '../types';

const Api = {
  getScopes: Mockify.getScopes,

  getService: async (name: string) => client.get<Service>(`${portalUrl}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<Service>(`${portalUrl}/v1/services`, params),
  getRoute: async (name: string) => client.get<Route>(`${portalUrl}/v1/routes/service-name/${name}`),
};
export default Api;
