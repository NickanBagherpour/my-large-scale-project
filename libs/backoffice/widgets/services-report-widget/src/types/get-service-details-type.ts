export type ServiceDetails = {
  scopes: {
    id: number;
    ssoScopeId: number;
    name: string;
    description: string;
  }[];
  serviceInfoId: number;
  serviceLatinName: string;
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
