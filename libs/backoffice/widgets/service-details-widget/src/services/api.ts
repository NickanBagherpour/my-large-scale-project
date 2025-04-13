import { client, API_PREFIX } from '@oxygen/client';

import Mockify from '@oxygen/mockify';
import { UpstreamCardsData, UpstreamListData } from '../types';
import { DocumentListResponseType, UploadDocumentResponseType } from '../types/documentation-tab';
import { ApiUtil } from '@oxygen/utils';

const Api = {
  deleteRemoveUploadedFile: async (params) => {
    const { serviceName, serviceDocumentId } = params;
    return client.delete<any>(`${API_PREFIX.PUBLISHER}/v1/services/${serviceName}/files/${serviceDocumentId}`);
  },
  getDownloadUploadedFile: async (params) => {
    const { serviceName, serviceDocumentId, fileExtension, fileType, fileName } = params;
    const xhr = await ApiUtil.getFile(`${API_PREFIX.PUBLISHER}/v1/services/${serviceName}/files/${serviceDocumentId}`);
    if (xhr) {
      ApiUtil.downloadFile(xhr, fileType, fileExtension, `${fileName}`);
    }
    return { data: null };
  },
  getDocumentList: async (params) => {
    return client.get<DocumentListResponseType[]>(`${API_PREFIX.PUBLISHER}/v1/services/${params}/files`);
  },

  postDocumentUpload: async (params) => {
    const { file, serviceName } = params;
    const formData = new FormData();
    formData.append('file', file, file.name);
    return client.post<UploadDocumentResponseType>(`${API_PREFIX.PUBLISHER}/v1/services/${serviceName}/files`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  getUpstreamList: async (params) => {
    return client.get<UpstreamListData>(`${API_PREFIX.PUBLISHER}/v1/upstreams/service-name/${params}`);
  },
  getUpstreamCardsDetail: async (params) => {
    return client.get<UpstreamCardsData>(`${API_PREFIX.PUBLISHER}/v1/upstreams`, { params });
  },
  getUpstreamCardDetails: async (params) => {
    return client.get(`${API_PREFIX.PUBLISHER}/v1/upstreams/${params}`);
    // return client.post<ReportResponseType>(`${API_PREFIX.PUBLISHER}/v1/redemption/report`, params);
  },
  assignToService: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${API_PREFIX.PUBLISHER}/v1/upstreams/${id}/assign-to-service/${serviceName}`);
  },
  assignToServiceScope: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${API_PREFIX.PUBLISHER}/v1/scope/${id}/assign/${serviceName}`);
  },
  getServiceDetails: async (params) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/services/service-name/${params}`);
    return Mockify.ServiceDetails();
  },
  getRouteDetails: async (params) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/routes/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getServiceScope: async (params) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/scope/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getScopes: async (params: any) => client.get<any>(`${API_PREFIX.PUBLISHER}/v1/scope`, { params }),
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
  },
  getScopeListBySearch: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/scope?${queryString}`);
  },
  deleteServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.delete<any>(`${API_PREFIX.PUBLISHER}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  addServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.post<any>(`${API_PREFIX.PUBLISHER}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  postAssignScopeToService: async ({ upstreamName, serviceName }: any) =>
    client.post<unknown>(`${API_PREFIX.PUBLISHER}/v1/upstreams/${upstreamName}/services/${serviceName}`),
};
export default Api;
