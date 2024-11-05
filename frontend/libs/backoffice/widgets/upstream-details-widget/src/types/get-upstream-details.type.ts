import { FiltersType, PaginationType } from '../context/types';

export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  page: number;
};

// export type ServiceType = {
//   name: string;
//   persianName: string;
//   scope: string;
//   url: string;
//   status: boolean;
// };

export type UpstreamDetailsType = {
  domain: string;
  healthStatus: string;
  weight: string;
};

export type UpstreamDetailsTypeQuery = {
  list: UpstreamDetailsType[];
  total: number;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

// import { FiltersType, PaginationType } from '../context/types';

// export type ReportResponseType = {
//   responseId: number;
//   serviceTypeCode: number;
//   items: ItemType[];
//   paginationResult: PaginationResultType;
// };

// export type ItemType = {
//   uid: number;
//   count: number;
//   amount: number;
//   operationStatus: OperationStatusType;
// };

// export type OperationStatusType = {
//   title: string;
//   code: string;
// };

// export type PaginationResultType = {
//   pageNumber: number;
//   pageSize: number;
//   totalNumberOfEntries: number;
// };

// export type FetchParamsType = {
//   filters?: FiltersType;
//   pagination: PaginationType;
// };
