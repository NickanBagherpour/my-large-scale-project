import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';
import { ClientPlugins, ClientPluginParams, ServicePluginParams } from '../types/plugins.type';
import { ClientInfo, ClientTypes } from '../types';

const Api = {
  getClientInfo: async (clientName: string) => client.get<ClientInfo>(`${portalUrl}/v1/clients/${clientName}`),

  getServicesData: async (params: Pagination) => Mockify.getServices(params),

  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${portalUrl}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) =>
    client.get<ClientPlugins[]>(`${portalUrl}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: ClientPluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceName, ...body }: ServicePluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client-service/${clientName}/${serviceName}`, body),

  getClientTypes: async () => client.get<ClientTypes>(`${portalUrl}/v1/enums/client-types`),
};
export default Api;
