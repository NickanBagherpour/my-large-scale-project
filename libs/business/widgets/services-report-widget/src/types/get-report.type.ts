import { PaginationType } from '../context/types';
import { Nullable } from '@oxygen/types';

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

export type ReportResponseType = {
  error: ErrorInfo;
  response: ServicesReportResponseType;
  additionalProperties: Record<string, unknown>;
};

type ErrorInfo = {
  code: string;
  message: string;
  timestamp: string;
  domain: string;
  errors: ErrorDetail[];
};

type ErrorDetail = {
  name: string;
  summary: string;
  detail: string;
};

export type ServicesReportResponseType = {
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  content: ServiceItemType[];
  number: number;
  sort: SortOption[];
  empty: boolean;
};

export type Pageable = {
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortOption[];
};

export type SortOption = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

export type ServiceItemType = {
  id: string;
  datetime: string;
  serviceId: string;
  serviceName: string;
  consumerUsername: string;
  appName: string;
  status: string;
};
