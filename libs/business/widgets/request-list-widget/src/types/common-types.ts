import { WidgetStateType } from '../context/types';

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
  requestId: number;
};

export type Sort = WidgetStateType['sort'];
export type Status = WidgetStateType['status'];
export type UserRoleType = string;
