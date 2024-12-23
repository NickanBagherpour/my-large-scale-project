export type Scope = {
  idx: number;
  scopeName: string;
  persianName: string;
};

export type UpstreamServer = {
  domain: string;
  healthStatus: string;
  weight: number;
};
