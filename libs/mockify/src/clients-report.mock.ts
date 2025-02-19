import { ClientsReportData } from './data/clients-report.data';

export const getClientsReport = async (): Promise<any> => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: ClientsReportData,
          total: ClientsReportData.length,
        },
      };

      resolve(response);
    }, 1000);
  });

  return data;
};
