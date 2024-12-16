import { client, portalUrl } from '@oxygen/client';

import Mockify from '@oxygen/mockify';

const Api = {
  getUpstreamCardDetails: async () => {
    return Mockify.UpstreamCardDetails();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceDetails: async () => {
    return Mockify.ServiceDetails();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getRouteDetails: async () => {
    return Mockify.RouteDetails();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getScopes: Mockify.getScopes,
};
export default Api;
