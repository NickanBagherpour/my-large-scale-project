import { productHistoryData } from './data/product-history.data';

export type HistoryReportData = {
  data: {
    total: number;
    content: {
      productName: string;
      accountType: {
        code: string;
        title: string;
      };
      subTypeCode: {
        code: string;
        title: string;
      };
      customerType: string;
      beneficiary: string;
      branchCode: number;
      registerTime: string;
      registrant: string;
      status: {
        code: string;
        title: string;
      };
    }[];
  };
};

export const getHistoryReport = async (params): Promise<any> => {
  // const offset:number = params.pagination.offset;
  const limit = params.pagination.limit;
  const offset = params.pagination.page * limit - limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response: HistoryReportData = {
        data: {
          content: productHistoryData.slice(offset, endIndex),
          total: productHistoryData.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
