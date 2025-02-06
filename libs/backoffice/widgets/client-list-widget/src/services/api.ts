import { client, portalUrl } from '@oxygen/client';
import { Clients, ClientsParams, Drafts, ParamsWithPagination } from '../types';

const Api = {
  getClientsListData: async (params: ClientsParams) => {
    return client.get<Clients>(`${portalUrl}/v1/clients`, { params });
  },

  getDraftsData: async (params: ParamsWithPagination) => {
    return client.get<Drafts>(`${portalUrl}/v1/clients/drafts`, { params });
  },

  deleteDraft: async (draftName: string) => {
    return client.delete(`${portalUrl}/v1/clients/${draftName}`);
  },
};

export default Api;
