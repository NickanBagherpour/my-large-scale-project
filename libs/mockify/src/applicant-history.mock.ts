import { applicantHistoryData } from './data/applicant-history.data';
import { ApplicantHistoryData } from '@oxygen/types';

export const getApplicantHistory = async ({ page, rowsPerPage }) => {
  return new Promise<{ data: { content: ApplicantHistoryData[]; total: number } }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({ data: { content: applicantHistoryData.slice(start, end), total: applicantHistoryData.length } });
    }, 700);
  });
};
