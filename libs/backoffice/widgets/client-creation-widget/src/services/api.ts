import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { OrganizationInfoResponceType } from '../types/first-step/organization-info.type';
import { FirstStepType } from '../context/types';

const Api = {
  // getTableReportData: async (params: FetchParamsType) => Mockify.clientCreationTable(params),
  getMainCardData: async () => Mockify.getPlugins(),
  getSelectData: async () => Mockify.getSelectOptions(),

  getNameTagData: async () => client.get(`${portalUrl}/v1/tags/client`),
  postClient: async (params) => client.post<FirstStepType>(`${portalUrl}/v1/clients`, { ...params }),
  getClientTypes: async () => client.get(`${portalUrl}/v1/enums/client-types`),
  getClientDraftInfo: async (params) => client.get(`${portalUrl}/v1/clients/${params}`),
  getClientInquirySSO: async (params) => client.get(`${portalUrl}/v1/clients/inquiry-client-sso`, { params }),
  getClientInquiryStatus: async (params) => client.get(`${portalUrl}/v1/clients/inquiry-client-status`, { params }),
  getOrganizationInfo: async (params) =>
    client.get<OrganizationInfoResponceType>(`${portalUrl}/v1/organization`, { params }),
};

export default Api;
