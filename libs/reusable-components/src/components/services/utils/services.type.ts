import { PaginatedData } from '@oxygen/types';

export type Pagination = {
  page: number;
  size: number;
};

export type ServiceParams = {
  'search-field': string;
  isActive: boolean;
  sort: 'createDate,DESC' | 'createDate,ASC';
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

export type ServiceDetails = {
  scopes: {
    id: number;
    ssoScopeId: number;
    name: string;
    description: string;
  }[];
  serviceInfoId: number;
  serviceenglishName: string;
  servicePersianName: string;
  serviceDescription: string | null;
  serviceCategoryTitle: string;
  serviceVersion: string;
  routes: {
    routeMethod: string[];
    routeProtocol: string[];
    routeHosts: string[];
    routePath: string[];
  }[];
  isActive: boolean;
  isInSSO: boolean;
  serviceProtocol: string;
  servicePort: number;
  upstreamTitle: string;
  throughput: {
    code: number;
    title: string;
  };
  authenticationType: {
    code: number;
    title: string;
  };
  ownerName: string;
  tags: {
    id: number;
    title: string;
  }[];
  serviceProgress: {
    statusCode: number;
    statusTitle: string;
    percent: number;
    step: number;
  };
};
