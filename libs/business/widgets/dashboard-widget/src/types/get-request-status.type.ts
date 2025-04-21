export type RequestStatusResponse = RequestDistribution[];
export type RequestDistribution = {
  submissionStatus: {
    code: number;
    title: string;
  };
  statusDistribution: {
    count: number;
    percentage: number;
  };
};
