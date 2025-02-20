import { client, portalUrl } from '@oxygen/client';

import Mockify from '@oxygen/mockify';
import { UpstreamCardsData, UpstreamListData } from '../types';

const Api = {
  getUpstreamList: async (params) => {
    return client.get<UpstreamListData>(`${portalUrl}/v1/upstreams/service-name/${params}`);
  },
  getUpstreamCardsDetail: async (params) => {
    return client.get<UpstreamCardsData>(`${portalUrl}/v1/upstreams`, { params });
  },
  getUpstreamCardDetails: async (params) => {
    return client.get(`${portalUrl}/v1/upstreams/${params}`);
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  assignToService: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${portalUrl}/v1/upstreams/${id}/assign-to-service/${serviceName}`);
  },
  assignToServiceScope: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${portalUrl}/v1/scope/${id}/assign/${serviceName}`);
  },
  getServiceDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/services/service-name/${params}`);
    return Mockify.ServiceDetails();
  },
  getRouteDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/routes/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getServiceScope: async (params) => {
    return client.get<any>(`${portalUrl}/v1/scope/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getScopes: async (params: any) => client.get<any>(`${portalUrl}/v1/scope`, { params }),
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
  },
  getScopeListBySearch: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return client.get<any>(`${portalUrl}/v1/scope?${queryString}`);
  },
  deleteServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.delete<any>(`${portalUrl}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  addServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.post<any>(`${portalUrl}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  postAssignScopeToService: async ({ scopeName, serviceName }: any) =>
    client.post<unknown>(`${portalUrl}/v1/upstreams/${scopeName}/assign-to-service/${serviceName}`),
};
export default Api;
