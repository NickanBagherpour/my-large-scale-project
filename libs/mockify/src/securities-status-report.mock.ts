import {
  securitiesCouponsData,
  securitiesStatusReportData,
  securitiesStatusReportDetail,
} from './data/securities-status-report.data';

export const getSecuritiesStatusReport = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: securitiesStatusReportData.content.slice(offset, endIndex),
        total: securitiesStatusReportData.totalCount,
        amounts: securitiesStatusReportData.totalAmount,
      };

      resolve(response);
    }, 2500);
  });
};

export const getSecuritiesStatusDetail = async (params): Promise<any> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: securitiesStatusReportDetail,
      };
      resolve(response);
    }, 2500);
  });
};

export const getSecuritiesStatusPdf = async (params): Promise<any> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = 'https://dl3.takbook.com/pdf3/ebook10735[www.takbook.com].pdf';

      resolve(response);
    }, 800);
  });
};

export const getSecuritiesStatusExcel = async (params): Promise<any> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response =
        'https://worldofacc.com/wp-content/uploads/2022/09/%D9%81%D8%A7%DA%A9%D8%AA%D9%88%D8%B1-%D9%81%D8%B1%D9%88%D8%B4-%D8%A7%D8%B1%D8%B2%D8%B4-%D8%A7%D9%81%D8%B2%D9%88%D8%AF%D9%87-%D8%AF%D8%A7%D8%B1.xlsx';

      resolve(response);
    }, 800);
  });
};

export const getSecuritiesCouponsData = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: securitiesCouponsData,
      };

      resolve(response);
    }, 1000);
  });
};
