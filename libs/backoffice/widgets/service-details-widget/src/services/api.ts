import { client, portalUrl } from '@oxygen/client';

import Mockify from '@oxygen/mockify';
import { UpstreamCardsData, UpstreamListData } from '../types';

const Api = {
  getUpstreamList: async (params) => {
    return client.get<UpstreamListData>(`${portalUrl}/v1/upstreams/service-name/${params}`);
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getUpstreamCardDetails: async (params) => {
    return client.get<UpstreamCardsData>(`${portalUrl}/v1/upstreams`, params);
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceDetails: async () => {
    return Mockify.ServiceDetails();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceClientsList: async () => {
    console.log(Mockify.ServiceClientsList(), 'in api');

    return Mockify.ServiceClientsList();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
};
export default Api;
