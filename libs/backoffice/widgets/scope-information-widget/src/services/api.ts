import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ModalDataType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeInfo: async (params) => {
    return client.get<any>(`${portalUrl}/v1/scope/${params}`);
  },
  getModalData: async (params) => {
    return client.get<ModalDataType>(`${portalUrl}/v1/services/${params}`);
  },
  getScopeServicesData: async (params) => {
    const { page, size, id } = params;
    return client.get<any>(`${portalUrl}/v1/services?scope-id=${id}`, { params: { page, size } });
  },
  getExcel: async (params) => Mockify.getServices(params),
};
export default Api;
