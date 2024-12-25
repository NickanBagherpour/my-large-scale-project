import { client, portalUrl } from '@oxygen/client';

import {
  FetchParamsType,
  FetchRequestDetailParamsType,
  FetchRequestedServicesParamsType,
  ReportResponseType,
} from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  // getReportData: async (params: FetchParamsType) => {
  // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);

  // },
  getRequestInfo: async (params: FetchRequestDetailParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getRequestInfo(params);
  },
  getRequestResult: async (params: FetchRequestDetailParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getRequestResult(params);
  },
  getRequestedServices: async (params: FetchRequestedServicesParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getRequestedServices(params);
  },
};
export default Api;
