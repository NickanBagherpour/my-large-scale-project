import { FiltersType, PaginationType } from '../context/types';

interface FeeStep {
  fromRate: number;
  toRate: number;
  fee: number;
}

interface TransactionFee {
  fromRate: number;
  toRate: number;
  percent: number;
  min: number;
  max: number;
}

interface ContentType {
  serviceName: string;
  servicePersianName: string;
  bankingShare: number;
  operationShare: number;
  feeType: string;
  fee: number;
  feeSteps: FeeStep[];
  transactionFees: TransactionFee[];
  aggregationType: string;
  fieldName: string;
  type: string;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

export type TariffListResponceType = {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ContentType[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
};

export type TariffListQueryParamsType = {
  page: number;
  size: number;
  'search-field'?: string;
};
