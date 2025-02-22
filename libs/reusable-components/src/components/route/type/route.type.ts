export type PostRouteParams = {
  serviceName: string;
  name?: string;
  methods: {
    code: number;
    title: string;
  }[];
  protocols: {
    code: number;
    title: string;
  }[];
  paths: string[];
  hosts: string[];
};

export type PutRouteParams = PostRouteParams & {
  id: number;
};

export type Route = {
  route: {
    id: number;
    name: string;
    serviceName: string;
    methods: {
      code: number;
      title: string;
    }[];
    protocols: {
      code: number;
      title: string;
    }[];
    paths: string[];
    hosts: string[];
  };
  isServiceInSso: boolean;
};

export type CodeTitle = {
  code: number;
  title: string;
};
