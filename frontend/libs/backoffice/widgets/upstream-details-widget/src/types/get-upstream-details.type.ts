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
