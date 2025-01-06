export interface ServiceInfoDto {
  scopeName: string;
  scopeDescription: string;
  scopeId: number;
  serviceInfoId: number;
  serviceLatinName: string;
  servicePersianName: 'string';
  serviceDescription: 'string';
  serviceCategoryTitle: string;
  serviceVersion: string;
  routeMethod: string;
  routeProtocol: 'http';
  routeHosts: null;
  routePath: null;
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
  tags: [];
}
