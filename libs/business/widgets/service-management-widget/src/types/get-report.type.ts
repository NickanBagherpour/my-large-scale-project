import { Nullable } from '@oxygen/types';

export interface TableResponseType {
  content: TableDataContentType[];
  page: TableDataPaginationType;
}

interface TableDataContentType {
  id: number;
  name: string;
  persianName: string;
  fee: number | null;
  version: string;
  isCommercial: boolean;
  isFinancial: boolean;
}

interface TableDataPaginationType {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

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

export type getTableReportParamsType = {
  serviceName?: Nullable<string>;
  isCommercial?: boolean;
  sort: 'asc' | 'desc';
  page: number;
  size: number;
};
