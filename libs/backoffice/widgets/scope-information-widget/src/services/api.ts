import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async (params) => {
    return client.get<any>(`${portalUrl}/v1/scope/${params}`);
  },
  getServicesData: async (params) => {
    const { page, pageSize, id } = params;
    return client.get<any>(`${portalUrl}/v1/services?scope-id=${id}`, { params: { page, pageSize } });
  },
  getExcel: async (params) => Mockify.getServices(params),
};
export default Api;
