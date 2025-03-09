import { PaginationType } from '../context/types';
import { Nullable } from '@oxygen/types';

export type FetchParamsType = {
  page: PaginationType['page'];
  size: PaginationType['rowsPerPage'];
  ['search-field']?: string;
  sort: string;
  isActive: Nullable<boolean>;
};

export type ServicesReportResponseType = {
  error: ErrorInfo;
  response: {
    content: ServiceItemType[];
    page: PageInfo;
  };
};

export type ErrorInfo = {
  code: string;
  message: string;
  timestamp: string;
  domain: Nullable<string>;
  errors: any | null;
};
export type ServiceItemType = {
  serviceName: string;
  servicePersianName: string;
  isActive: boolean;
  category: string;
  owner: string;
  gateWayId: string;
};

export type PageInfo = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};
