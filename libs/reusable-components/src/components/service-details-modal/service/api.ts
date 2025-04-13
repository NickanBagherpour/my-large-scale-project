import { client,API_PREFIX } from '@oxygen/client';
import { ServiceDetails } from '../types/type';

const Api = {
  getServiceDetails: async (name: string) =>
    client.get<ServiceDetails>(`${API_PREFIX.PUBLISHER}/v1/services/service-with-details/${name}`),
};
export default Api;
