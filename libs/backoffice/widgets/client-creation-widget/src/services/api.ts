import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';
import { FirstStepType } from '../context/types';
import { ClientDraftDataType } from '../types/first-step/client-draft.type';
import { InquiryStatusResponceType } from '../types/get-client-inquiry-status.type';
import { OrganizationInfoResponceType } from '../types';

const Api = {
  // getTableReportData: async (params: FetchParamsType) => Mockify.clientCreationTable(params),
  getMainCardData: async () => Mockify.getPlugins(),
  getSelectData: async () => Mockify.getSelectOptions(),
  postClient: async (params) => client.post<FirstStepType>(`${portalUrl}/v1/clients`, { ...params }),
  putProgress: async ({ clientName, progressCode }) =>
    client.put(`${portalUrl}/v1/clients/${clientName}/progress/${progressCode}`),

  getNameTagData: async () => client.get(`${portalUrl}/v1/tags/client`),
  getClientTypes: async () => client.get(`${portalUrl}/v1/enums/client-types`),
  getClientDraftInfo: async (params) => client.get<ClientDraftDataType>(`${portalUrl}/v1/clients/${params}`),
  getClientInquirySSO: async (params) => client.get(`${portalUrl}/v1/clients/inquiry-client-sso`, { params }),
  getClientInquiryStatus: async (params) =>
    client.get<InquiryStatusResponceType>(`${portalUrl}/v1/clients/inquiry-client-status`, { params }),
  getOrganizationInfo: async (params) =>
    client.get<OrganizationInfoResponceType>(`${portalUrl}/v1/organization`, { params }),
};

export default Api;
