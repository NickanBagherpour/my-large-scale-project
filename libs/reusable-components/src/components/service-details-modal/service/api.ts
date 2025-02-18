import { client, portalUrl } from '@oxygen/client';
import { ServiceDetails } from '../types/type';

const Api = {
  getServiceDetails: async (name: string) =>
    client.get<ServiceDetails>(`${portalUrl}/v1/services/service-with-details/${name}`),
};
export default Api;
