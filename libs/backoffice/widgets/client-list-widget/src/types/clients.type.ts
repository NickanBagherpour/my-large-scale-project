import { PaginatedData, Sort } from '@oxygen/types';

export type ParamsWithPagination = {
  page: number;
  size: number;
  sort: Sort;
};

export type Draft = {
  clientId: number;
  clientName: string;
  progressPercent: number;
  stepName: string;
};

export type Drafts = PaginatedData<Draft>;

export type ClientsParams = ParamsWithPagination & {
  isActive: boolean | null;
  searchParam: string;
};

export type Client = {
  clientId: number;
  clientName: string;
  organizationName: string;
  organizationNationalId: number | null;
  createDate: string;
  isActive: boolean;
};

export type Clients = PaginatedData<Client>;
