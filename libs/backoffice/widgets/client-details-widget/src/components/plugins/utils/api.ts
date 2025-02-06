import { client, portalUrl } from '@oxygen/client';
import { ClientPluginParams, ClientPlugins, ServicePluginParams } from './plugins.type';

const Api = {
  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${portalUrl}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) =>
    client.get<ClientPlugins[]>(`${portalUrl}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: ClientPluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceName, ...body }: ServicePluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client-service/${clientName}/${serviceName}`, body),
};
export default Api;
