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

export type DraftsParams = { page: number; size: number; sort: 'createDate,DESC' | 'createDate,ASC' };
