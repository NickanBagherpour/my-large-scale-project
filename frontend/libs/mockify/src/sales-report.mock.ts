import { salesReportData, securitiesDetails } from './data/sales-report.data';

export { securitiesDetails };

export const getSalesReport = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: salesReportData.slice(offset, endIndex),
        total: salesReportData.length,
        amounts: salesReportData.map((item) => item.amountsOfPapers).reduce((acc, currentValue) => acc + currentValue),
      };

      resolve(response);
    }, 2500);
  });
};
