import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { Pagination } from '@oxygen/types';
import { ClientInfo, ClientTypes } from '../types';

const Api = {
  getClientInfo: async (clientName: string) => client.get<ClientInfo>(`${portalUrl}/v1/clients/${clientName}`),

  getServicesData: async (params: Pagination) => Mockify.getServices(params),

  getClientTypes: async () => client.get<ClientTypes>(`${portalUrl}/v1/enums/client-types`),
};
export default Api;
