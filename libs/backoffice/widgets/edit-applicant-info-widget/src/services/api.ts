import Mockify from '@oxygen/mockify';

const Api = {
  getApplicantInfo: async (reqId) => {
    return Mockify.getApplicantInfo(reqId);
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
  },
};

export default Api;
