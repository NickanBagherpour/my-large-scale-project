import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { OrganizationInfoResponceType } from '../types/first-step/organization-info.type';

const Api = {
  // getTableReportData: async (params: FetchParamsType) => Mockify.clientCreationTable(params),
  getMainCardData: async () => Mockify.getPlugins(),
  getGrantTagData: async () => Mockify.getGrantTags(),
  getNameTagData: async () => Mockify.getNameTags(),
  getSelectData: async () => Mockify.getSelectOptions(),
  getClientTypes: async () => client.get(`${portalUrl}/v1/enums/client-types`),
  getOrganizationInfo: async (params) =>
    client.get<OrganizationInfoResponceType>(`${portalUrl}/v1/organization`, { params }),
};

export default Api;
