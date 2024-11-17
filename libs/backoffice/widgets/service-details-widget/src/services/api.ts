import { client, portalUrl } from '@oxygen/client';

import { FetchParamsType, ReportResponseType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getServiceDetails: async () => {
    return Mockify.ServiceDetails();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
  getServiceClientsList: async () => {
    return Mockify.ServiceClientsList();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
};
export default Api;
