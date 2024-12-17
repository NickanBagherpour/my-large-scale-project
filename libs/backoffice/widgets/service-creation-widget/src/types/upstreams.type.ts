import { PaginatedData } from './shared.type';

export type Upstream = {
  id: number;
  name: string;
  activeServerCount: number;
};

export type UpstreamWithTargets = {
  name: string;
  description: string | null;
  targets: {
    domain: string;
    weight: number;
  }[];
};

export type Upstreams = PaginatedData<Upstream>;
