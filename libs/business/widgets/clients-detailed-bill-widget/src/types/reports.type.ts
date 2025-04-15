import { PaginatedData, Sort } from '@oxygen/types';

export type ReportsParams = Partial<{
  'search-field': string;
  'client-type': number;
  month: number;
  year: number;
  page: number;
  size: number;
  sort: Sort;
}>;

export type Reports = PaginatedData<{
  id: number;
  name: string;
  year: string;
  month: string;
  successCount: number;
  failedCount: number;
  allCount: number;
}>;
