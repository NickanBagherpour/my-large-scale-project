import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getRouteChangeHistoryData: async (params: FetchParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);

    console.log(Mockify.getRouteChangeHistory(params), '*****');
    return Mockify.getRouteChangeHistory(params);
  },
};
export default Api;
