import { redeemCouponsData, redeemData, redeemSecuritiesDetails } from './data/redeem-report.data';

export { redeemData, redeemSecuritiesDetails };

export type RedeemReportData = {
  totalPagesCount: number;
  totalSecuritiesCount: number;
  totalSecuritiesPrice: number;
  content: {
    id: number;
    namePapers: string;
    paperCode: string;
    customerName: string;
    transactionNumber: string;
    numberOfPapers: string;
    amountsOfPapers: number;
    status: string;
  }[];
};

export const getRedeemReport = async ({ start, end }: { start: number; end: number }): Promise<RedeemReportData> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response: RedeemReportData = {
        content: redeemData.slice(start, end),
        totalPagesCount: redeemData.length,
        totalSecuritiesCount: 12,
        totalSecuritiesPrice: 123456,
      };

      resolve(response);
    }, 2500);
  });
};

export const getRedeeemCouponsData = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: redeemCouponsData,
      };

      resolve(response);
    }, 1000);
  });
};
