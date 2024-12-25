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
  getServiceDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/services/service-name/${params}`);
    return Mockify.ServiceDetails();
  },
  getRouteDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/routes/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getScopeListBySearch: async (params) => {
    return client.get<any>(`${portalUrl}/v1/scope/search/${params}`);
    // return Mockify.getScopes;
  },
};
export default Api;
