import { client, portalUrl } from '@oxygen/client';
import { CategoryType } from '../types/service-enum.type';
import { AccessEnumType } from '../types/service-enum.type';
import { TagType } from '../types/tags.type';
import { EditServiceRequest, ServiceInfoDto } from '../types/edit-service.type';

const Api = {
  // getServiceData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServiceInfo: async (serviceName: string) => {
    return client.get<ServiceInfoDto>(`${portalUrl}/v1/services/service-name/${serviceName}`);
  },
  getTags: async () => client.get<TagType[]>(`${portalUrl}/v1/tags`),
  getCategories: async () => client.get<CategoryType[]>(`${portalUrl}/v1/service-categories`),
  getServiceAccess: async () => client.get<AccessEnumType[]>(`${portalUrl}/v1/enums/service-access`),
  editService: async (params: EditServiceRequest) => {
    return client.post(`${portalUrl}/v1/services`, params);
  },
};
export default Api;
