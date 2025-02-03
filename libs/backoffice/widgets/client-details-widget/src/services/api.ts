import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';
import { ClientPlugins } from '../types/plugins.type';

const Api = {
  getClientInfoData: async () => Mockify.getClientInformation(),
  getServicesData: async (params: Pagination) => Mockify.getServices(params),
  getPluginsData: async () => Mockify.getPlugins(),
  getClientPlugins: async (name: string) => client.get<ClientPlugins>(`${portalUrl}/v1/plugins/client/${name}`),
  getClientServicePlugins: async (name: string) =>
    client.get<ClientPlugins[]>(`${portalUrl}/v1/plugins/client-service/${name}`),
};
export default Api;
