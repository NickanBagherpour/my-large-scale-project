export type FetchUpstreamTargetParamsType = {
  upstreamName: string;
};

type Target = {
  id: number;
  domain: string;
  weight: number;
};

export type GetUpstreamTargetResponseType = {
  name: string;
  description: string;
  targets: Target[];
};
