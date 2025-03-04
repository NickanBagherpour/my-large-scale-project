import { client, invoiceUrl, portalUrl } from '@oxygen/client';
//TODO: set type of response and params and the url after api is be ready
const Api = {
  getTariffListData: async (params) => {
    return client.get<any>(`${invoiceUrl}/v1/service-fees`, { params });
  },
  deleteService: async (serviceName: string) => {
    return client.delete<unknown>(`${portalUrl}/v1/clients/${serviceName}`);
  },
};
export default Api;
