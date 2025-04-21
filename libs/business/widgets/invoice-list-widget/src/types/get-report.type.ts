// export type FetchParamsType = {
//   filters?: FiltersType;
//   pagination: PaginationType;
// };

/////

type Pageable = {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
};

type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type SubmissionStatusType = {
  code: number;
  title: string;
};

export type CodeTitle = {
  code: number;
  title: string;
};

export type InvoiceListItemType = {
  id: number;
  name: string;
  year: string;
  month: SubmissionStatusType;
  billGenerator: string;
  state: CodeTitle;
  isDeleted: boolean;
  clientType: string;
};

export type GetInvoiceListResponseType = {
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: InvoiceListItemType[];
  number: number;
  sort: Sort;
  empty: boolean;
};
