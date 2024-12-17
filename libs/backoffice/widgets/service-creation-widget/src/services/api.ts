import { client, portalUrl } from '@oxygen/client';
import type { PostServiceParams, Route, Service, Upstreams, UpstreamWithTargets } from '../types';
import type { ScopesData, ScopesParams } from '../types/scopes.type';

const Api = {
  getService: async (name: string) => client.get<Service>(`${portalUrl}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<Service>(`${portalUrl}/v1/services`, params),
  getRoute: async (name: string) => client.get<Route>(`${portalUrl}/v1/routes/service-name/${name}`),
  getScopes: async (params: ScopesParams) => client.get<ScopesData>(`${portalUrl}/v1/scope/list`, { params }),
  getUpstreams: async () =>
    client.get<Upstreams>(`${portalUrl}/v1/upstreams`, {
      params: {
        page: 0,
        size: 100,
        sort: 'asc',
      },
    }),
  getUpstreamWithTargets: async (id: number) => client.get<UpstreamWithTargets>(`${portalUrl}/v1/upstreams/${id}`),
};
export default Api;
