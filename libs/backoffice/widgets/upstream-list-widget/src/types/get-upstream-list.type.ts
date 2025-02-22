import { PaginationType } from '../context/types';

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

export type FetchUpstreamListParamsType = Omit<PaginationType, 'rowsPerPage'> & {
  ['search-field']?: string;
};

type Pageable = {
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
};

type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type UpstreamItemType = {
  id: number;
  name: string;
  description: string;
  activeServerCount: number;
};

export type GetUpstreamListResponseType = {
  totalPages: number;
  totalElements: number;
  last: boolean;
  pageable: Pageable;
  first: boolean;
  numberOfElements: number;
  size: number;
  content: UpstreamItemType[];
  number: number;
  sort: Sort;
  empty: boolean;
};
