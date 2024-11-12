import { CouponsData, transferReportData, transferReportDetails } from './data/transfer-report.data';

export { transferReportData, transferReportDetails, CouponsData };

export const getTransferReport = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: transferReportData.slice(offset, endIndex),
        total: transferReportData.length,
        amounts: transferReportData
          .map((item) => item.amountsOfPapers)
          .reduce((acc, currentValue) => acc + currentValue),
      };

      resolve(response);
    }, 2500);
  });
};

export const getCouponsData = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: CouponsData,
      };

      resolve(response);
    }, 1000);
  });
};
