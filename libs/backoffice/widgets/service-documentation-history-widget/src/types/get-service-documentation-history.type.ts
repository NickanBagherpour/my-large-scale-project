import { DifferenceMap } from '@oxygen/hooks';

export type ServiceDocumentationHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  modifyBy: string;
};

export type HistoryDifferenceObj = DifferenceMap<ServiceDocumentationHistory>;
