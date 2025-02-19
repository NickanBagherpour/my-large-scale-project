import { client, portalUrl } from '@oxygen/client';

import Mockify from '@oxygen/mockify';
import { UpstreamCardsData, UpstreamListData } from '../types';
import { DocumentListResponseType, UploadDocumentResponseType } from '../types/documentation-tab';

const Api = {
  getDownloadUploadedFile: async (params) => {
    const { serviceName, serviceDocumentId } = params;
    return client.get<any>(`${portalUrl}/v1/services/${serviceName}/files/${serviceDocumentId}`);
  },
  getDocumentList: async (params) => {
    return client.get<DocumentListResponseType[]>(`${portalUrl}/v1/services/${params}/files`);
  },

  postDocumentUpload: async (params) => {
    const { file, serviceName } = params;
    const formData = new FormData();
    formData.append('file', file, file.name);
    return client.post<UploadDocumentResponseType>(`${portalUrl}/v1/services/${serviceName}/files`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  getUpstreamList: async (params) => {
    return client.get<UpstreamListData>(`${portalUrl}/v1/upstreams/service-name/${params}`);
  },
  getUpstreamCardsDetail: async (params) => {
    return client.get<UpstreamCardsData>(`${portalUrl}/v1/upstreams`, { params });
  },
  getUpstreamCardDetails: async (params) => {
    return client.get(`${portalUrl}/v1/upstreams/${params}`);
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  assignToService: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${portalUrl}/v1/upstreams/${id}/assign-to-service/${serviceName}`);
  },
  assignToServiceScope: async (params) => {
    const { id, serviceName } = params;
    return client.post<any>(`${portalUrl}/v1/scope/${id}/assign/${serviceName}`);
  },
  getServiceDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/services/service-name/${params}`);
    return Mockify.ServiceDetails();
  },
  getRouteDetails: async (params) => {
    return client.get<any>(`${portalUrl}/v1/routes/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getServiceScope: async (params) => {
    return client.get<any>(`${portalUrl}/v1/scope/service-name/${params}`);
    return Mockify.RouteDetails();
  },
  getScopes: async (params: any) => client.get<any>(`${portalUrl}/v1/scope`, { params }),
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getScopeListBySearch: async (params) => {
    //   return client.get<any>(`${portalUrl}/v1/scope/service-name/${params}`);
    //   // return Mockify.getScopes;
    // },
    // getScopeListBy: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return client.get<any>(`${portalUrl}/v1/scope?${queryString}`);
    // return Mockify.getScopes;
  },
  deleteServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.delete<any>(`${portalUrl}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  addServiceScope: async ({ servicename, scopeId }: { servicename: string; scopeId: string | number }) => {
    return client.post<any>(`${portalUrl}/v1/scope/${servicename}/assign-to-service/${scopeId}`);
  },
  postAssignScopeToService: async ({ scopeName, serviceName }: any) =>
    client.post<unknown>(`${portalUrl}/v1/scope/${scopeName}/assign/${serviceName}`),
  // deleteServiceScope: (async = (params) => {
  //   const { servicename, scopeId } = params;

  //   return client.delete(`/services/${servicename}/scopes/${scopeId}`);
  // }),

  // getScopeListBySearch: async (params) => {
  //   const queryString = new URLSearchParams(params).toString();
  //   try {
  //     const response = await client.get<any>(`${portalUrl}/v1/scope?${queryString}`);
  //     return response;
  //   } catch (error) {
  //     const axiosError = error as any;
  //     if (axiosError.response?.status === 500) {
  //       console.error('Received 500 error. Returning mock data.');
  //       return Mockify.getScopes;
  //     } else {
  //       throw error;
  //     }
  //   }
  // },
};
export default Api;
