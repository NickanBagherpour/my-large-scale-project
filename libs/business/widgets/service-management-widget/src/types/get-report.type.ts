import { Nullable } from '@oxygen/types';
import { FiltersType, PaginationType } from '../context/types';

export type TableResponseType = {
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

export type FetchParamsType = {
  serviceName?: Nullable<string>;
  isCommercial?: boolean;
  sort: 'asc' | 'desc';
  page: number;
  size: number;
};
