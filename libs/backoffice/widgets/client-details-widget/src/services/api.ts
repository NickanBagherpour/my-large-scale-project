import { client, portalUrl } from '@oxygen/client';
import { ClientInfo } from '../types';

const Api = {
  getClientInfo: async (clientName: string) => client.get<ClientInfo>(`${portalUrl}/v1/clients/${clientName}`),
};
export default Api;
