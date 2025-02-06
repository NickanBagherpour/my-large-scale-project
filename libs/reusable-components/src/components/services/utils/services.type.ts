import { PaginatedData } from '@oxygen/types';

type Pagination = {
  page: number;
  size: number;
};

export type ServiceParams = Pagination & {
  'search-field': string;
  isActive: boolean;
  sort: 'createDate,DESC' | 'createDate,ASC';
};

export type Service = {
  id: number;
  name: string;
  persianName: string;
  scope: string;
  version: string;
  path: string;
  isActive: boolean;
};

export type Services = PaginatedData<Service>;

export type ServiceToClientParams = {
  clientName: string;
  serviceInfoId: number;
};
