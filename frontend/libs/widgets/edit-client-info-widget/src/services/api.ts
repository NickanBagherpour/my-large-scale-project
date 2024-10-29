import { client, portalUrl } from '@oxygen/client';

import Mockify from '@oxygen/mockify';

const Api = {
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
