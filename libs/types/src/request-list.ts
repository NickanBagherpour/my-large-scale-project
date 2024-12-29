export type SubmissionStatusType = {
  code: number;
  title: string;
};

export type RequestListType = {
  index: number;
  organizationName: string;
  clientName: string;
  submissionStatus: SubmissionStatusType;
  createDate: string;
  serviceCount: string;
  representative: string;
  uploaded: boolean;
};
