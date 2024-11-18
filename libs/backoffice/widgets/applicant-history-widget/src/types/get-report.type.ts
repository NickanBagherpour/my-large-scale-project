import { ApplicantHistoryData, Nullable } from '@oxygen/types';
import { PaginationType } from '../context/types';

export type ReportResponseType = {
  data: {
    content: ApplicantHistoryData[];
    total: number;
  };
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type ApplicantId = Nullable<string>;

export type FetchParamsType = PaginationType & {
  applicantId: ApplicantId;
};
