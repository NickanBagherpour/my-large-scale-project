import { ClientHistoryData, Nullable } from '@oxygen/types';

export type ReportResponseType = {
  data: {
    content: ClientHistoryData[];
    total: number;
  };
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type ClientName = Nullable<string>;

export type FetchClientHistoryParamsType = {
  page: number;
  size: number;
  clientName: ClientName;
};

type CodeTitle = {
  code: number;
  title: string;
};

type CommonClientInfoDto = {
  clientId: number;
  name: string;
  clientType: CodeTitle;
};

type SortInfo = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

type ValueWithDifference<T> = {
  value: T;
  hasDifference: boolean;
};

type RevisionType = {
  code: ValueWithDifference<number>;
  title: ValueWithDifference<string>;
};

type RevisionDtoValue = {
  revNumber: ValueWithDifference<number>;
  revType: ValueWithDifference<RevisionType>;
};

type RevisionDto = {
  value: RevisionDtoValue;
  hasDifference: boolean;
};

type ClientInfoDtoValue = {
  isClientFlow: ValueWithDifference<boolean>;
  isImplicitFlow: ValueWithDifference<boolean>;
  isPasswordFlow: ValueWithDifference<boolean>;
  isAuthorizationFlow: ValueWithDifference<boolean>;
  modifyDate: ValueWithDifference<string>;
  modifyBy: ValueWithDifference<string>;
  persianName: ValueWithDifference<string>;
  url: ValueWithDifference<string>;
  inboundUrl: ValueWithDifference<string>;
  redirectUrl: ValueWithDifference<string>;
  deleted: ValueWithDifference<boolean>;
};

type ClientInfoDto = {
  value: ClientInfoDtoValue;
  hasDifference: boolean;
};

export type ClientHistoryItemType = {
  revisionDto: RevisionDto;
  clientInfoDto: ClientInfoDto;
};

export type ClientHistoryResponseType = {
  commonClientInfoDto: CommonClientInfoDto;
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  empty: boolean;
  content: ClientHistoryItemType[];
};
