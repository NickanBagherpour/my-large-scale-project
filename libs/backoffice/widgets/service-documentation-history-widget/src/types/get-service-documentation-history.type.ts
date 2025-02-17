import { DifferenceMap } from '@oxygen/hooks';

export type ServiceDocumentationHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  userName: string;
  actionType: string;
  fileName: string;
};

export type HistoryDifferenceObj = DifferenceMap<ServiceDocumentationHistory>;
