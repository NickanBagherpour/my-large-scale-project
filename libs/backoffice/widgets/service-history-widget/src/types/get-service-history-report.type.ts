import { DifferenceMap } from '@oxygen/hooks';
// -------
export type FetchParamsType = {
  page?: number;
  size?: number;
  sort?: SortType | SortType[];
  id: number;
};

type ValueWithDifference<T> = {
  value: T;
  hasDifference: boolean;
};

export type SortType = 'modifyDate,DESC' | 'modifyDate,ASC';
export type ServiceHistoryContent = {
  service: ServiceInfo;
  modifyDate: string;
  modifyBy: string;
  isDeleted: ValueWithDifference<boolean>;
  revisionDto: {
    revNumber: number;
    revType: {
      code: ValueWithDifference<number>;
      title: ValueWithDifference<string>;
    };
  };
};
export type ServiceInfo = {
  serviceInfoId: number;
  name: string;
  persianName: string;
  accessLevel: {
    code: number;
    title: string;
  };
  category: {
    code: number;
    title: string;
  };
  throughput: {
    code: number;
    title: string;
  };
  version: string;
  owner: string;
  serviceInfoDescription: string;
  isActive: boolean;
  isDeleted: boolean;
  tags: [
    {
      id: number;
      title: string;
    }
  ];
};

export type HistoryDifferenceObj = DifferenceMap<ServiceHistoryContent>;
