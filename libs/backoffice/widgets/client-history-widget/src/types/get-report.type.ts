import { ClientHistoryData, Nullable } from '@oxygen/types';

import { PaginationType } from '../context/types';

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

export type FetchParamsType = PaginationType & {
  clientId: Nullable<string>;
};
