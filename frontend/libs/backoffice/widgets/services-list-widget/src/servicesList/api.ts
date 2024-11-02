// import { client, portalUrl } from '@oxygen/client';
import Mockify from '@oxygen/mockify';

import { ParamsType } from '../types';

const Api = {
  // getReportData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServicesList: async (params: ParamsType) => {
    const res = Mockify.getServicesList(params);
    return res;
  },

  getDraftsData: async () => {
    return Mockify.getServicesDrafts();
  },
};
export default Api;
