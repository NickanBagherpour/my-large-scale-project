import { client, portalUrl } from '@oxygen/client';

import { FetchSubmissionDetailParamsType, PostSubmissionReviewParamsType, SubmissionDetailType } from '../types';
import { ApiUtil } from '@oxygen/utils';

const Api = {
  getSubmissionDetail: async (params: FetchSubmissionDetailParamsType) => {
    const { role, submissionId, ...restParams } = params;
    const rolePrefix = ApiUtil.getApiPrefix(role);
    return client.get<SubmissionDetailType>(`${portalUrl}/${rolePrefix}/v1/submissions/detail/${submissionId}`);
  },
  postSubmissionReview: async (params: PostSubmissionReviewParamsType) => {
    const { role, submissionId, ...restParams } = params;
    const rolePrefix = ApiUtil.getApiPrefix(role);
    return client.post(`${portalUrl}/${rolePrefix}/v1/submissions/review/${submissionId}`, { ...restParams });
  },
};
export default Api;
