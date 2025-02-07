import { client, portalUrl } from '@oxygen/client';
import { ClientPluginParams, ClientPlugins, ServicePlugin, ServicePluginParams } from './plugins.type';

const Api = {
  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${portalUrl}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) =>
    client.get<ServicePlugin[]>(`${portalUrl}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: ClientPluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceId, ...body }: ServicePluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client-service/${clientName}/${serviceId}`, body),
};
export default Api;
