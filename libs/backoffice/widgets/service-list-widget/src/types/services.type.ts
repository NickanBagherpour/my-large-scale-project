// import { PaginatedData } from '@oxygen/types';

import { Nullable } from '@oxygen/types';

export type ParamsWithPagination = {
  page: number;
  size: number;
  sort: 'createDate,DESC' | 'createDate,ASC';
};

export type Drafts = {
  content: Draft[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
};

export type ServiceProgress = {
  statusCode: number;
  statusTitle: string;
  percent: number;
  step: any;
};

export type Draft = {
  serviceInfoId: number;
  serviceName: string;
  serviceProgress: ServiceProgress;
  statusTitle: string;
};

export type ServicesParams = ParamsWithPagination & {
  isActive: boolean | null;
  searchParam: string;
};
