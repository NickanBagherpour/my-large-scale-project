import { PaginatedData } from '@oxygen/types';
import { ParamsWithPagaination } from './shared.type';

export type UpstreamsParams = ParamsWithPagaination<{
  'search-field': string;
}>;

export type Upstream = {
  id: number;
  name: string;
  activeServerCount: number;
};

export type UpstreamTarget = {
  domain: string;
  weight: number;
  healthStatus: string;
};

export type UpstreamWithTargets = {
  name: string;
  description: string | null;
  targets: UpstreamTarget[];
};

export type Upstreams = PaginatedData<Upstream>;

export type AssignUpstreamToServiceParams = {
  upstreamName: string;
  serviceName: string;
};
