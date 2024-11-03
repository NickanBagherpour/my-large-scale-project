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

export type ServiceType = {
  name: string;
  persianName: string;
  scope: string;
  url: string;
  status: boolean;
};

export type ServiceTypeQuery = {
  list: ServiceType[];
  total: number;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};
