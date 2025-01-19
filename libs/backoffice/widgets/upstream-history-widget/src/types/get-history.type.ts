import { DifferenceMap } from '@oxygen/hooks';

export type UpstreamHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  modifyBy: string;
};

export type HistoryDifferenceObj = DifferenceMap<UpstreamHistory>;
