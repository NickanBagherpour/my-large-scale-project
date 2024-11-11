import { clientHistoryData } from './data/client-history.data';

export type ClientHistoryData = {
  editTime: string;
  adminName: string;
  clientLatinName: string;
  clientFarsiName: string;
  clientType: string;
  clientId: string;
  verificationId: string;
  aggregatorStatus: string;
  aggregatorName: string;
  address: string;
  inputAddress: string;
};

export const getClientHistory = async ({ page, rowsPerPage }) => {
  return new Promise<{ data: { content: ClientHistoryData[]; total: number } }>((resolve, reject) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      // if(page > 9) {
      //   reject(Error('error'));
      // }

      resolve({ data: { content: clientHistoryData.slice(start, end), total: clientHistoryData.length } });
    }, 700);
  });
};
