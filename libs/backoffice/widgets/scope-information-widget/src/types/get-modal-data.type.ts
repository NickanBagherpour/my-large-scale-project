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

export type ModalDataType = {
  scopeName: string;
  scopeDescription: string;
  scopeId: number;
  serviceInfoId: number;
  serviceLatinName: string;
  servicePersianName: string;
  serviceDescription: string;
  serviceCategoryTitle: string;
  serviceVersion: string;
  routeMethod: string;
  routeProtocol: string;
  routeHosts: string;
  routePath: string;
  isActive: boolean;
  isInSSO: boolean;
  serviceProtocol: string;
  servicePort: number;
  upstreamTitle: string;
  throughput: Throughput;
  authenticationType: AuthenticationType;
  ownerName: string;
  tags: Tag[];
};
