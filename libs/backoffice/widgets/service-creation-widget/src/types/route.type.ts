export type RouteParams = {
  serviceName: string;
  method: {
    code: number;
    title: string;
  };
  protocol: {
    code: number;
    title: string;
  };
  path: string;
  host: string;
};

export type Route = {
  method: {
    code: number;
    title: string;
  };
  protocol: {
    code: number;
    title: string;
  };
  path: string;
  host: string;
  isServiceInSso: boolean;
};
