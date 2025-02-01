export type PostRouteParams = {
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

export type PutRouteParams = PostRouteParams & {
  id: number;
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
  id: number;
};
