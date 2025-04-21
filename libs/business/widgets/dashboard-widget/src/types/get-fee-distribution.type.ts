export type FeeDistributionResponse = {
  operationShare: {
    feeAmount: number;
    feePercentage: number;
  };
  bankingShare: {
    feeAmount: number;
    feePercentage: number;
  };
};
