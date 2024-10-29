import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async (params: FetchParamsType) => {
    return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getGrantType: async () => {
    return Mockify.getGrantTyp();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getTagsInfo: async () => {
    return Mockify.TagInfo();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
};
export default Api;
