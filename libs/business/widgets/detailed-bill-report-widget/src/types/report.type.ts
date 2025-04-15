export type InfoParams = {
  'client-type': number;
  id: number;
};

export type InfoData = {
  name: string;
  nationalCode: string;
  billingYear: number;
  billingMonth: number;
  successTransactions: number;
  failedTransactions: number;
  totalTransactions: number;
  sumAmount: number;
  clientDataList: [
    {
      name: string;
      gatewayId: string;
    }
  ];
};

export type ReportParams = {
  gatewayId: number;
  'client-gateway-id': string;
  month: number;
  year: number;
};

export type NonfinancialReportData = {
  clientGatewayId: string;
  successCount: number;
  failedCount: number;
  name: string;
  persianName: string;
}[];

export type FinancialReportData = {
  id: number;
  clientGatewayId: string;
  successCount: number;
  failedCount: number;
  totalAmount: number;
  fromRate: number;
  toRate: number;
  percent: number;
}[];
