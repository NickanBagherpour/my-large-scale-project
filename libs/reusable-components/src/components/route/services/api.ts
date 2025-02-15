import { client, portalUrl } from '@oxygen/client';
import type { CodeTitle, PostRouteParams, Route, PutRouteParams } from '../type/route.type';

const Api = {
  getRoute: async (name: string) => client.get<Route>(`${portalUrl}/v1/routes/service-name/${name}`),
  postRoute: async ({ serviceName, ...otherParams }: PostRouteParams) =>
    client.post(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
  putRoute: async ({ serviceName, ...otherParams }: PutRouteParams) =>
    client.put(`${portalUrl}/v1/routes/service-name/${serviceName}`, otherParams),
  getServiceHttpMethod: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<CodeTitle[]>(`${portalUrl}/v1/enums/service-protocol`),
};

export default Api;
