import { client, portalUrl } from '@oxygen/client';

// import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  // getReportData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getRouteDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/routes/service-name/${params}`);
    // return Mockify.RouteDetails();
  },
  getServiceHttpMethod: async () => client.get<any>(`${portalUrl}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<any>(`${portalUrl}/v1/enums/service-protocol`),
  editRoute: async (params) => {
    const { serviceName, ...rest } = params; // Extract `id` and `serviceName`

    return client.post(`${portalUrl}/v1/routes/service-name/${serviceName}`, rest);
  },
};
export default Api;
