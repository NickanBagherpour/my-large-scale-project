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

type HasDifference = {
  value: any;
  hasDifference: boolean;
};

type RevisionDto = {
  value: {
    revNumber: HasDifference;
    revType: {
      value: {
        code: HasDifference;
        title: HasDifference;
      };
      hasDifference: boolean;
    };
  };
  hasDifference: boolean;
};

type ClientType = {
  value: {
    code: HasDifference;
    title: HasDifference;
  };
  hasDifference: boolean;
};

type CommonClientInfoDto = {
  value: {
    clientId: HasDifference;
    name: HasDifference;
    persianName: HasDifference;
    clientType: ClientType;
  };
  hasDifference: boolean;
};

type ClientInfoDto = {
  value: {
    commonClientInfoDto: CommonClientInfoDto;
    isClientFlow: HasDifference;
    isImplicitFlow: HasDifference;
    isPasswordFlow: HasDifference;
    isAuthorizationFlow: HasDifference;
    modifyDate: HasDifference;
    modifyBy: HasDifference;
    url: HasDifference;
    inboundUrl: HasDifference;
    redirectUrl: HasDifference;
    deleted: HasDifference;
  };
  hasDifference: boolean;
};

export type ClientHistoryItemType = {
  revisionDto: RevisionDto;
  clientInfoDto: ClientInfoDto;
};

type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

export type ClientHistoryResponseType = {
  content: ClientHistoryItemType[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
};
