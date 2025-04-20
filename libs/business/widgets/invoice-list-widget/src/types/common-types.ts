import { WidgetStateType } from '../context/types';

export type SubmissionStatusType = {
  code: number;
  title: string;
};

export type InvoiceListType = {
  id: number;
  name: string;
  year: string;
  month: SubmissionStatusType;
  billGenerator: string;
  state: string; //{code:number; title:string}
};

export type Sort = WidgetStateType['sort'];
export type Status = WidgetStateType['status'];
export type UserRoleType = string;
