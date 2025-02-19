import { DifferenceMap } from '@oxygen/hooks';

export type ServiceDocumentationHistory = {
  upstream: {
    name: string;
    description: string;
  };
  modifyDate: string;
  userName: string;
  fileName: string;
  isDeleted: boolean;
  revisionDto: {
    revNumber: number;
    revType: {
      code: number;
      title: string;
    };
  };
};

export type HistoryDifferenceObj = DifferenceMap<ServiceDocumentationHistory>;
