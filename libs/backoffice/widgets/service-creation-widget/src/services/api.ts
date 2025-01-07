import { client, portalUrl } from '@oxygen/client';
import type {
  AssignUpstreamToServiceParams,
  CodeTitle,
  PostServiceParams,
  RouteParams,
  Route,
  Service,
  Tags,
  Upstreams,
  UpstreamsParams,
  UpstreamWithTargets,
  ServiceInquiry,
} from '../types';
import type { AssignScopeToServiceParams, Scope, ScopesData, ScopesParams } from '../types/scopes.type';

const Api = {
  getService: async (name: string) => client.get<Service>(`${portalUrl}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<unknown>(`${portalUrl}/v1/services`, params),
  getRoute: async (name: string) => client.get<Route>(`${portalUrl}/v1/routes/service-name/${name}`),
  getScopes: async (params: ScopesParams) => client.get<ScopesData>(`${portalUrl}/v1/scope`, { params }),
  getUpstreams: async (params: UpstreamsParams) =>
    client.get<Upstreams>(`${portalUrl}/v1/upstreams`, {
      params,
    }),
  getUpstreamWithTargets: async (name: string) => client.get<UpstreamWithTargets>(`${portalUrl}/v1/upstreams/${name}`),
  getTags: async () => client.get<Tags>(`${portalUrl}/v1/tags`),
  getCategories: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/service-categories`),
  getServiceAccess: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-access`),
  getThroughput: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/throughput`),
  getServiceScope: async (name: string) =>
    client.get<Scope & { isServiceInSso: boolean }>(`${portalUrl}/v1/scope/service-name/${name}`),
  getUpstream: async (name: string) =>
    client.get<UpstreamWithTargets & { id: number }>(`${portalUrl}/v1/upstreams/service-name/${name}`),
  postAssignUpstreamToService: async ({ upstreamName, serviceName }: AssignUpstreamToServiceParams) =>
    client.post<unknown>(`${portalUrl}/v1/upstreams/${upstreamName}/assign-to-service/${serviceName}`),
  postRoute: async ({ serviceName, ...otherParams }: RouteParams) =>
    client.post(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
  putRoute: async ({ serviceName, ...otherParams }: RouteParams) =>
    client.put(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
  postAssignScopeToService: async ({ scopeName, serviceName }: AssignScopeToServiceParams) =>
    client.post<unknown>(`${portalUrl}/v1/scope/${scopeName}/assign/${serviceName}`),
  getServiceHttpMethod: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-protocol`),
  postCofirmData: async (serviceName: string) => client.post(`${portalUrl}/v1/services/confirm-info/${serviceName}`),
  getServiceInquiry: async (serviceName: string) =>
    client.get<ServiceInquiry>(`${portalUrl}/v1/services/service-inquiry`, {
      params: { 'service-name': serviceName },
    }),
  postRegisterToBaam: async ({ scopeName, serviceName }: AssignScopeToServiceParams) =>
    client.post<unknown>(`${portalUrl}/v1/services/${serviceName}/register-to-bam/${scopeName}`),
};

export default Api;
