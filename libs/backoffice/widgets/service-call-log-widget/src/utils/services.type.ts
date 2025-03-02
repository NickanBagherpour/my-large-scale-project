import { PaginatedData } from '@oxygen/types';

export type Pagination = {
  page: number;
  size: number;
};

export type ClientServicesParams = Pagination & {
  clientName: string;
  sort: 'createDate,DESC' | 'createDate,ASC';
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
