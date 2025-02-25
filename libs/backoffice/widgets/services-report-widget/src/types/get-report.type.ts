import { PaginationType } from '../context/types';
import { Nullable } from '@oxygen/types';

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

export type FetchParamsType = {
  page: PaginationType['page'];
  size: PaginationType['rowsPerPage'];
  ['search-field']?: string;
  sort: string;
  isActive: Nullable<boolean>;
};

export type ServiceDto = {
  id: number;
  name: string;
  persianName: string;
  scopes: string[];
  version: string;
  paths: string[];
  isActive: boolean;
};

export interface ServicesReportResponseType {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ServiceDto[];

  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}
