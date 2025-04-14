import { API_PREFIX, client } from '@oxygen/client';
import { ClientInfo } from '../types';

const Api = {
  getClientInfo: async (clientName: string) =>
    client.get<ClientInfo>(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}`),
};
export default Api;
