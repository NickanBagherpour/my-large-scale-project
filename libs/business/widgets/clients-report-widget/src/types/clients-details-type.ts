export type ClientDetails = {
  services: {
    name: string;
    persianName: string;
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

export interface ClientServicesDto {
  error: {
    code: string;
    message: string;
    timestamp: string;
    domain: string;
    errors: [
      {
        name: string;
        summary: string;
        detail: string;
      }
    ];
  };
  response: [
    {
      serviceName: string;
      serviceEnglishName: string;
    }
  ];
  additionalProperties: {
    additionalProp1: any;
    additionalProp2: any;
    additionalProp3: any;
  };
}
