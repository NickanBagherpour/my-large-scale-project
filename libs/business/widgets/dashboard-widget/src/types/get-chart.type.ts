export interface ChartResponse {
  totalCount: number;
  successCount: number;
  failureCount: number;
  fromDate: string;
  toDate: string;
  data: {
    time: string;
    totalCount: number;
    detail: {
      failureCount: number;
      successCount: number;
    };
  }[];
}
