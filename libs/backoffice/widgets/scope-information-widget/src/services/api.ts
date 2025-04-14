import { API_PREFIX, client } from '@oxygen/client';

import { FetchParamsType, ModalDataType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getScopeInfo: async (params) => {
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/scope/${params}`);
  },
  getModalData: async (params) => {
    return client.get<ModalDataType>(`${API_PREFIX.PUBLISHER}/v1/services/service-with-details/${params}`);
  },
  getScopeServicesData: async (params) => {
    const { page, size, id } = params;
    return client.get<any>(`${API_PREFIX.PUBLISHER}/v1/scope/${id}/services`, { params: { page, size } });
  },
  getExcel: async (params) => Mockify.getServices(params),
};
export default Api;
