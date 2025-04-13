import { client, API_PREFIX } from '@oxygen/client';
import { FirstStepType } from '../context/types';
import { ClientDraftDataType } from '../types/first-step/client-draft.type';
import { InquiryStatusResponceType } from '../types/get-client-inquiry-status.type';
import { OrganizationInfoResponceType } from '../types';
import { ClientInfoResponseType } from '../types/first-step/client-info.type';

const Api = {
  postClient: async (params) => client.post<FirstStepType>(`${API_PREFIX.PUBLISHER}/v1/clients`, { ...params }),
  putProgress: async ({ clientName, progressCode }) =>
    client.put(`${API_PREFIX.PUBLISHER}/v1/clients/${clientName}/progress/${progressCode}`),

  getNameTagData: async () => client.get(`${API_PREFIX.PUBLISHER}/v1/tags/client`),
  getClientTypes: async () => client.get(`${API_PREFIX.PUBLISHER}/v1/enums/client-types`),
  getClientInfo: async (params) => client.get<ClientInfoResponseType>(`${API_PREFIX.PUBLISHER}/v1/clients/${params}/integrations`),
  getClientDraftInfo: async (params) => client.get<ClientDraftDataType>(`${API_PREFIX.PUBLISHER}/v1/clients/${params}`),
  getClientInquirySSO: async (params) => client.get(`${API_PREFIX.PUBLISHER}/v1/clients/inquiry-client-sso`, { params }),
  getClientInquiryStatus: async (params) =>
    client.get<InquiryStatusResponceType>(`${API_PREFIX.PUBLISHER}/v1/clients/inquiry-client-status`, { params }),
  getOrganizationInfo: async (params) =>
    client.get<OrganizationInfoResponceType>(`${API_PREFIX.PUBLISHER}/v1/organization`, { params }),
};

export default Api;
