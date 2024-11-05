import Mockify from '@oxygen/mockify';

const Api = {
  // getServiceData: async (params: FetchParamsType) => {
  //   return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  // },
  getServiceInfo: async (id: string) => {
    return Mockify.getServiceInfo(id);
  },
};
export default Api;
