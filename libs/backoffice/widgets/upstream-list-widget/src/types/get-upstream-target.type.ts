import { Nullable } from '@oxygen/types';

export type FetchUpstreamTargetParamsType = Nullable<string>;

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
