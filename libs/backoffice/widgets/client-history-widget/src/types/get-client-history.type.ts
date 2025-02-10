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

type ValueWithDifference<T> = {
  value: T;
  hasDifference: boolean;
};

type RevisionDto = {
  revNumber: number;
  revType: CodeTitle;
};

export type ClientInfoDto = {
  persianName: string;
  isClientFlow: boolean;
  isImplicitFlow: boolean;
  isPasswordFlow: boolean;
  isAuthorizationFlow: boolean;
  modifyDate: string;
  modifyBy: string;
  url: string;
  inboundUrl: string;
  redirectUrl: string;
  deleted: boolean;
};

export type ClientInfoHistoryItemDto = {
  revisionDto: RevisionDto;
  clientInfoDto: ClientInfoDto;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type CommonClientInfoDto = {
  clientId: number;
  name: string;
  clientType: CodeTitle;
  lastPersianName: string;
};

export type ClientHistoryResponseType = {
  clientInfoHistoryItemDtos: {
    content: ClientInfoHistoryItemDto[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    empty: boolean;
  };
  commonClientInfoDto: CommonClientInfoDto;
};

export type NormalizedClientHistoryItemType = {
  deleted: ValueWithDifference<boolean>;
  inboundUrl: ValueWithDifference<string>;
  isAuthorizationFlow: ValueWithDifference<boolean>;
  isClientFlow: ValueWithDifference<boolean>;
  isImplicitFlow: ValueWithDifference<boolean>;
  isPasswordFlow: ValueWithDifference<boolean>;
  modifyBy: ValueWithDifference<string>;
  modifyDate: ValueWithDifference<string>;
  persianName: ValueWithDifference<string>;
  redirectUrl: ValueWithDifference<string>;
  revNumber: ValueWithDifference<number>;
  revType: ValueWithDifference<any>;
  url: ValueWithDifference<string>;
};

export type NormalizedClientHistoryResponse = {
  commonClientInfoDto: CommonClientInfoDto;
  content: NormalizedClientHistoryItemType[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
};
