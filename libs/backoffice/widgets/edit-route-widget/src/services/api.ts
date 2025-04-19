import { API_PREFIX, client } from '@oxygen/client';

// import { FetchParamsType, ReportResponseType } from '../types';

const Api = {
  // getReportData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getRouteDetails: async (params) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${params}`);
    // return Mockify.RouteDetails();
  },
  getServiceHttpMethod: async () => client.get<any>(`${API_PREFIX.PUBLISHER}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<any>(`${API_PREFIX.PUBLISHER}/v1/enums/service-protocol`),
  editRoute: async (params) => {
    const { serviceName, ...rest } = params; // Extract `id` and `serviceName`

    return client.put(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${serviceName}`, rest);
  },
};
export default Api;
