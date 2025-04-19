import { client, API_PREFIX } from '@oxygen/client';
import { ClientServicesParams, ServiceParams, Services, ServiceToClientParams, Pagination } from '../types/services';

const Api = {
  getServices: async (params: ServiceParams & Pagination) =>
    client.get<Services>(`${API_PREFIX.PUBLISHER}/v1/services`, { params }),

  postAssignServiceToClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.post(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}/services/${serviceInfoId}`),

  deleteUnassignServiceFromClient: async ({ clientName, serviceInfoId }: ServiceToClientParams) =>
    client.delete(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}/services/${serviceInfoId}`),

  getClientServices: async ({ clientName, ...params }: ClientServicesParams) =>
    client.get<Services>(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}/services`, { params }),
};
export default Api;
