import { applicantInfoData } from './data/applicant-info.data';

export const getApplicantInfo = async (reqId): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: applicantInfoData.find((item) => item.requestId == reqId),
      };
      resolve(response);
    }, 1500);
  });
};
