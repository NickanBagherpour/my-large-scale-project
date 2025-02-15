type Throughput = {
  code: number;
  title: string;
};

type AuthenticationType = {
  code: number;
  title: string;
};

type Tag = {
  id: number;
  title: string;
};
export type ProgressEvent = {
  statusCode: number;
  statusTitle: string;
  percent: number;
  step: number;
};

export type RouteType = {
  routeMethod: string[];
  routeProtocol: string[];
  routeHosts: string;
  routePath: string;
};

export type ModalDataType = {
  scopeName: string;
  scopeDescription: string;
  scopeId: number;
  serviceInfoId: number;
  serviceenglishName: string;
  servicePersianName: string;
  serviceDescription: string;
  serviceCategoryTitle: string;
  serviceVersion: string;
  routes: RouteType[];
  scopes: any[];
  isActive: boolean;
  isInSSO: boolean;
  serviceProtocol: string;
  servicePort: number;
  upstreamTitle: string;
  throughput: Throughput;
  authenticationType: AuthenticationType;
  ownerName: string;
  tags: Tag[];
  serviceProgress: ProgressEvent;
};
