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

export type FirstStepParams = {
  name: string;
  persian_name: string;
};

export type UpstreamDetailsType = {
  domain: string;
  healthStatus: string;
  weight: string;
};

export type UpstreamDetails = {
  name: string;
  persianName: string;
  serverList: {
    domain: string;
    healthStatus: string;
    weight: string;
  }[];
};

export type UpstreamDetailsTypeQuery = {
  list: UpstreamDetails;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type EditUpstreamParamsType = {
  name: string;
  description: string;
};
