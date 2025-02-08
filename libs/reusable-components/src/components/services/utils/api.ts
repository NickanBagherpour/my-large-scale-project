import { client, portalUrl } from '@oxygen/client';
import { ClientServicesParams, ServiceParams, Services, ServiceToClientParams } from './services.type';

const Api = {
  getServices: async (params: ServiceParams) => client.get<Services>(`${portalUrl}/v1/services`, { params }),

  postAssignServiceToClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.post(`${portalUrl}/v1/clients/${clientName}/services/${serviceInfoId}`),

  deleteUnassignServiceFromClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.delete(`${portalUrl}/v1/clients/${clientName}/services/${serviceInfoId}`),

  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${portalUrl}/v1/clients/${clientName}/services`, { params }),
};
export default Api;
