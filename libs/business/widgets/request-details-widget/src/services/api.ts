import { client, portalUrl } from '@oxygen/client';

import { FetchSubmissionDetailParamsType, PostSubmissionReviewParamsType, SubmissionDetailType } from '../types';

const Api = {
  getSubmissionDetail: async (params: FetchSubmissionDetailParamsType) => {
    return client.get<SubmissionDetailType>(`${portalUrl}/v1/submissions/detail/${params.submissionId}`);
  },
  postSubmissionReview: async (params: PostSubmissionReviewParamsType) => {
    const { submissionId, ...rest } = params;
    return client.post(`${portalUrl}/v1/submissions/review/${submissionId}`, { ...rest });
  },
};
export default Api;
