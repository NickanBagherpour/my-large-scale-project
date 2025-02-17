import { DifferenceMap } from '@oxygen/hooks';

export type UpstreamHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  modifyBy: string;
  deleted: boolean;
  revision: {
    revNumber: number;
    revType: {
      code: number;
      title: string;
    };
  };
};

export type HistoryDifferenceObj = DifferenceMap<UpstreamHistory>;
