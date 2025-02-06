import { client, portalUrl } from '@oxygen/client';
import { ServiceParams, Services, ServiceToClientParams } from './services.type';

const Api = {
  getServices: async (params: ServiceParams) => client.get<Services>(`${portalUrl}/v1/services`, { params }),

  postAssignServiceToClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.post(`${portalUrl}/v1/clients/${clientName}/assign/${serviceInfoId}`),

  deleteUnassignServiceFromClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.post(`${portalUrl}/v1/clients/${clientName}/unassign/${serviceInfoId}`),
};
export default Api;
