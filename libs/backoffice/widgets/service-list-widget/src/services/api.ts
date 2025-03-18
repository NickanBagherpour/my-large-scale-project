import { client, portalUrl } from '@oxygen/client';

import { ParamsType, ServicesDto } from '../types';
import { Drafts, DraftsParams } from '../types/services.type';

const Api = {
  getServicesList: async (params: ParamsType) => {
    return client.get<ServicesDto>(`${portalUrl}/v1/services`, { params });
  },
  // getDraftsData: async () => {
  //   return client.get<DraftDto[]>(`${portalUrl}/v1/services/draft`);
  // },
  getDraftsData: async (params: DraftsParams) => {
    return client.get<Drafts>(`${portalUrl}/v1/services/draft`, { params });
  },
  uploadService: async (serviceName: string) => {
    return client.post(`${portalUrl}/v1/services/import-service?service-name=${serviceName}`);
  },
  toggleStatus: async ({ serviceName, ...rest }) => {
    return client.patch(`${portalUrl}/v1/services/${serviceName}/enabled`, {}, { params: rest });
  },
  getClients: async (serviceName?: string) => {
    return client.get(`${portalUrl}/v1/clients/operational/${serviceName}`);
  },
};
export default Api;
