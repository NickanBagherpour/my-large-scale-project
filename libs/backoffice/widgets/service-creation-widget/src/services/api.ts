import { client, API_PREFIX } from '@oxygen/client';
import type {
  AssignUpstreamToServiceParams,
  CodeTitle,
  PostServiceParams,
  Route,
  Service,
  Tags,
  Upstreams,
  UpstreamsParams,
  UpstreamWithTargets,
  ServiceInquiry,
} from '../types';
import type { scopeToServiceParams, ScopesData, ScopesParams, ServiceScope } from '../types/scopes.type';

const Api = {
  getService: async (name: string) => client.get<Service>(`${API_PREFIX.PUBLISHER}/v1/services/service-name/${name}`),
  postService: async (params: PostServiceParams) => client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/services`, params),
  getRoute: async (name: string) => client.get<Route>(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${name}`),
  getScopes: async (params: ScopesParams) => client.get<ScopesData>(`${API_PREFIX.PUBLISHER}/v1/scope`, { params }),
  getUpstreams: async (params: UpstreamsParams) =>
    client.get<Upstreams>(`${API_PREFIX.PUBLISHER}/v1/upstreams`, {
      params,
    }),
  getUpstreamWithTargets: async (name: string) => client.get<UpstreamWithTargets>(`${API_PREFIX.PUBLISHER}/v1/upstreams/${name}`),
  getTags: async () => client.get<Tags>(`${API_PREFIX.PUBLISHER}/v1/tags/service`),
  getCategories: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/service-categories`),
  getServiceAccess: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/service-access`),
  getThroughput: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/throughput`),
  getServiceScope: async (name: string) => client.get<ServiceScope[]>(`${API_PREFIX.PUBLISHER}/v1/scope/service-name/${name}`),
  getUpstream: async (name: string) =>
    client.get<UpstreamWithTargets & { id: number }>(`${API_PREFIX.PUBLISHER}/v1/upstreams/service-name/${name}`),
  postAssignUpstreamToService: async ({ upstreamName, serviceName }: AssignUpstreamToServiceParams) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/upstreams/${upstreamName}/services/${serviceName}`),
  postAssignScopeToService: async ({ scopeName, serviceName }: scopeToServiceParams) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/scope/${scopeName}/services/${serviceName}`),
  deleteUnassignScopeFromService: async ({ scopeName, serviceName }: scopeToServiceParams) =>
    client.delete<unknown>(`${API_PREFIX.PUBLISHER}/v1/scope/${scopeName}/services/${serviceName}`),
  getServiceHttpMethod: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/service-protocol`),
  postCofirmData: async (serviceName: string) => client.post(`${API_PREFIX.PUBLISHER}/v1/services/confirm-info/${serviceName}`),
  getServiceInquiry: async (serviceName: string) =>
    client.get<ServiceInquiry>(`${API_PREFIX.PUBLISHER}/v1/services/inquiry-service-status`, {
      params: { 'service-name': serviceName },
    }),
  postRegisterToSso: async (serviceName: string) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/services/register-to-sso/${serviceName}`),
};

export default Api;
