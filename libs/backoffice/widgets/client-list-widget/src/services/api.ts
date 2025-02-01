import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import type { ParamsType } from '@oxygen/types';
import { Drafts, ParamsWithPagination } from '../types';

const Api = {
  getClientsListData: async (params: ParamsType) => {
    return Mockify.getClients(params);
  },

  getDraftsData: async (params: ParamsWithPagination) => {
    return client.get<Drafts>(`${portalUrl}/v1/clients/drafts`, { params });
  },
};
export default Api;
