import Mockify from '@oxygen/mockify';

const Api = {
  getReportData: async () => {
    return Mockify.getReportData();
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemptin/report`, params);
  },
};
export default Api;
