import { FiltersType, PaginationType } from '../context/types';
import { Nullable } from '@oxygen/types';
import { TFunction } from 'i18next';
import { CONFIRM_MODAL, CONFIRM_MODAL_NAMES } from '../utils/consts';
import { z } from 'zod';

export type ReportResponseType = {
  responseId: number;
  serviceTypeCode: number;
  items: ItemType[];
  paginationResult: PaginationResultType;
};

export type ItemType = {
  uid: number;
  count: number;
  amount: number;
  operationStatus: OperationStatusType;
};

export type OperationStatusType = {
  title: string;
  code: string;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type FetchRequestDetailParamsType = {
  requestId: RequestId;
};
export type FetchRequestedServicesParamsType = {
  // filters?: FiltersType;
  requestId: RequestId;
  pagination: PaginationType;
};

export type RequestId = Nullable<string>;

export type CodeTitle = {
  code: string;
  title: string;
};

export enum RequestStatus {
  PROCESS = '01',
  INITIAL_APPROVAL = '02',
  FINAL_APPROVAL = '03',
  REJECTED = '04',
}

export type RequestConfirm = {
  description: string;
};

export enum PanelType {
  BUSINESS = 'BUSINESS',
  BUSINESS_BANKING = 'BUSINESS_BANKING',
}
