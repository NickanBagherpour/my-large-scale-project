export type PostTariffParams = {
  serviceName: string;
  bankingShare: number;
  operationShare: number;
  feeType: string;
  aggregationType: string;
  fieldName: string;
  type: string;

  fee?: number;
  feeSteps?: {
    fromRate: number;
    toRate: number;
    fee: number;
  }[];
  transactionFees?: {
    fromRate: number;
    toRate: number;
    percent: number;
    min: number;
    max: number;
  }[];
};
