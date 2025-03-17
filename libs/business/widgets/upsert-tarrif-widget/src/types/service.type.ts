export type PostTariffParams = {
  serviceName: string;
  bankingShare: number;
  operationShare: number;
  feeType: string;
  aggregationType: string;
  fieldName: string;
  type: string;
  typeFieldName: string;

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

export type Fee = {
  serviceName: string;
  servicePersianName: string;
  bankingShare: number;
  operationShare: number;
  feeType: number;
  fee: number;
  feeSteps: {
    fromRate: number;
    toRate: number;
    fee: number;
  }[];
  transactionFees: {
    fromRate: number;
    toRate: number;
    percent: number;
    min: number;
    max: number;
  }[];
  aggregationType: number;
  fieldName: string;
  type: string;
  typeFieldName: string;
};

export type GetServiceParams = {
  'service-name': string | null;
};
