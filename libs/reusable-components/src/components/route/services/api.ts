import { API_PREFIX, client } from '@oxygen/client';
import type { CodeTitle, PostRouteParams, Route, PutRouteParams } from '../type/route.type';

const Api = {
  getRoute: async (name: string) => client.get<Route>(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${name}`),
  postRoute: async ({ serviceName, ...otherParams }: PostRouteParams) =>
    client.post(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${serviceName}`, otherParams),
  putRoute: async ({ serviceName, ...otherParams }: PutRouteParams) =>
    client.put(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${serviceName}`, otherParams),
  getServiceHttpMethod: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/service-http-method`),
  getServiceProtocol: async () => client.get<CodeTitle[]>(`${API_PREFIX.PUBLISHER}/v1/enums/service-protocol`),
};

export default Api;
