import { client, API_PREFIX } from '@oxygen/client';
import { ClientPluginParams, ClientPlugins, ServicePlugin, ServicePluginParams } from '../types/plugins.type';

const Api = {
  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${API_PREFIX.PUBLISHER}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) =>
    client.get<ServicePlugin[]>(`${API_PREFIX.PUBLISHER}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: ClientPluginParams) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceName, ...body }: ServicePluginParams) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/plugins/client-service/${clientName}/${serviceName}`, body),
};
export default Api;
