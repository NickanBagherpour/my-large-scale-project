import { client, portalUrl } from '@oxygen/client';
import type { CodeTitle, PostServiceParams, Route, Service, Tags, Upstreams, UpstreamWithTargets } from '../types';
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
        size: 5,
        sort: 'asc',
      },
    }),
  getUpstreamWithTargets: async (id: number) => client.get<UpstreamWithTargets>(`${portalUrl}/v1/upstreams/${id}`),
  getTags: async () => client.get<Tags>(`${portalUrl}/v1/tags`),
  getCategories: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/service-categories`),
  getServiceAccess: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-access`),
};
export default Api;
