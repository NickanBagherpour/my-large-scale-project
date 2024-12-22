import { client, portalUrl } from '@oxygen/client';
import type {
  AssignUpstreamToServiceParams,
  CodeTitle,
  GeneralInfoParams,
  RouteParams,
  PostServiceParams,
  Route,
  Service,
  Tags,
  Upstreams,
  UpstreamsParams,
  UpstreamWithTargets,
} from '../types';
import type { Scope, ScopesData, ScopesParams } from '../types/scopes.type';

const Api = {
  getService: async (name: string) => client.get<Service>(`${portalUrl}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<Service>(`${portalUrl}/v1/services`, params),
  postGeneralInfo: async (params: GeneralInfoParams) =>
    client.post<unknown>(`${portalUrl}/v1/services/register-general-info`, params),
  getRoute: async (name: string) => client.get<Route>(`${portalUrl}/v1/routes/service-name/${name}`),
  getScopes: async (params: ScopesParams) => client.get<ScopesData>(`${portalUrl}/v1/scope/search`, { params }),
  getUpstreams: async (params: UpstreamsParams) =>
    client.get<Upstreams>(`${portalUrl}/v1/upstreams`, {
      params,
    }),
  getUpstreamWithTargets: async (id: number) => client.get<UpstreamWithTargets>(`${portalUrl}/v1/upstreams/${id}`),
  getTags: async () => client.get<Tags>(`${portalUrl}/v1/tags`),
  getCategories: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/service-categories`),
  getServiceAccess: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-access`),
  getThroughput: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/throughput`),
  getScope: async (name: string) => client.get<Scope>(`${portalUrl}/v1/scope/service-name/${name}`),
  getUpstream: async (name: string) =>
    client.get<UpstreamWithTargets>(`${portalUrl}/v1/upstreams/service-name/${name}`),
  postAssignUpstreamToService: async ({ id, serviceName }: AssignUpstreamToServiceParams) =>
    client.post<unknown>(`${portalUrl}/v1/upstreams/${id}/assign-to-service/${serviceName}`),
  // /publisher/api/v1/routes/service-name/{service-name}
  postRoute: async ({ serviceName, ...otherParams }: RouteParams) =>
    client.post(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
  putRoute: async ({ serviceName, ...otherParams }: RouteParams) =>
    client.put(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
};

export default Api;
