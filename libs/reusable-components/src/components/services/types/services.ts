import type { PaginatedData, Sort } from '@oxygen/types';

export type Pagination = {
  page: number;
  size: number;
};

export type ServiceParams = {
  'search-field': string;
  isActive: boolean;
  sort: Sort;
};

export type ClientServicesParams = Pagination & {
  clientName: string;
  sort: Sort;
};

export type Service = {
  id: number;
  name: string;
  persianName: string;
  scopes: string[];
  version: string;
  paths: string[];
  isActive: boolean;
};

export type Services = PaginatedData<Service>;

export type ServiceToClientParams = {
  clientName: string;
  serviceInfoId: number;
};
