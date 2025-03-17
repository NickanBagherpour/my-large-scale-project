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
    toRate: string;
    fee: number;
  }[];
  transactionFees?: {
    fromRate: number;
    toRate: string;
    percent: number;
    min: number;
    max: number;
  }[];
};

type ServiceNames = {
  serviceName: string;
  servicePersianName: string;
};

export type ObjNullable<T extends object> = { [K in keyof T]: T[K] | null };

export type Fee = ServiceNames &
  ObjNullable<{
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
  }>;

export type GetServiceParams = {
  'service-name': string | null;
};
