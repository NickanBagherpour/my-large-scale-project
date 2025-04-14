import { API_PREFIX, client } from '@oxygen/client';
import { Clients, ClientsParams, Drafts, ParamsWithPagination } from '../types';

const Api = {
  getClientsListData: async (params: ClientsParams) => {
    return client.get<Clients>(`${API_PREFIX.PUBLISHER}/v1/clients`, { params });
  },

  getDraftsData: async (params: ParamsWithPagination) => {
    return client.get<Drafts>(`${API_PREFIX.PUBLISHER}/v1/clients/drafts`, { params });
  },

  deleteDraft: async (draftName: string) => {
    return client.delete(`${API_PREFIX.PUBLISHER}/v1/clients/${draftName}`);
  },
};

export default Api;
