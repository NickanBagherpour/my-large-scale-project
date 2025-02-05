import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';
import { ClientPlugins, ClientPluginParams, ServicePluginParams } from '../types/plugins.type';

const Api = {
  getClientInfoData: async () => Mockify.getClientInformation(),

  getServicesData: async (params: Pagination) => Mockify.getServices(params),

  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${portalUrl}/v1/plugins/client/${name}`),

  getClientServicePlugins: async (name: string) =>
    client.get<ClientPlugins[]>(`${portalUrl}/v1/plugins/client-service/${name}`),

  postClientConfig: async ({ clientName, ...body }: ClientPluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client/${clientName}`, body),

  postServiceConfig: async ({ clientName, serviceName, ...body }: ServicePluginParams) =>
    client.post<unknown>(`${portalUrl}/v1/plugins/client-service/${clientName}/${serviceName}`, body),
};
export default Api;
