import { client, portalUrl } from '@oxygen/client';

import { FetchSubmissionDetailParamsType, PostSubmissionReviewParamsType, SubmissionDetailType } from '../types';
import Mockify from '@oxygen/mockify';

const Api = {
  getSubmissionDetail: async (params: FetchSubmissionDetailParamsType) => {
    return client.get<SubmissionDetailType>(`${portalUrl}/v1/submissions/detail/${params.submissionId}`);
  },
  getRequestResult: async (params: FetchSubmissionDetailParamsType) => {
    // return client.post<ReportResponseType>(`${portalUrl}/v1/redemption/report`, params);
    return Mockify.getRequestResult(params);
  },
  postSubmissionReview: async (params: PostSubmissionReviewParamsType) => {
    const { submissionId, ...rest } = params;
    return client.post(`${portalUrl}/v1/submissions/review/${submissionId}`, { ...rest });
  },
};
export default Api;
