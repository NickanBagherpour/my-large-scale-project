export type ReportResponseType = {
  responseId: number;
  serviceTypeCode: number;
  items: ItemType[];
  paginationResult: PaginationResultType;
};

export type ItemType = {
  uid: number;
  count: number;
  amount: number;
  operationStatus: OperationStatusType;
};

export type OperationStatusType = {
  title: string;
  code: string;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};
