interface FeeStepType {
  fromRate: number;
  toRate: number;
  fee: number;
}

interface TransactionFeeType {
  fromRate: number;
  toRate: number;
  percent: number;
  min: number;
  max: number;
}

export type TariffDetailsType = {
  serviceName: string;
  servicePersianName: string;
  bankingShare: number;
  operationShare: number;
  feeType: string;
  fee: number;
  feeSteps: FeeStepType[];
  transactionFees: TransactionFeeType[];
  aggregationType: string;
  fieldName: string;
  type: string;
  typeFieldName: string;
};
