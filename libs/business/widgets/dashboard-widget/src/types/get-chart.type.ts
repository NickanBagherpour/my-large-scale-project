export interface ChartResponse {
  fromDate: string;
  toDate: string;
  totalCount: number;
  data: {
    time: string;
    count: number;
  }[];
}
