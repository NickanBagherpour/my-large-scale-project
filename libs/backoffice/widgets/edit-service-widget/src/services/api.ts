import { client, portalUrl } from '@oxygen/client';
import { ServiceInfoDto } from '../types/get-service.type';

const Api = {
  // getServiceData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServiceInfo: async (id: number) => {
    return client.get<ServiceInfoDto>(`${portalUrl}/v1/services/${id}`);
  },
};
export default Api;
