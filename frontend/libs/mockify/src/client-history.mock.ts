import { clientHistoryData } from './data/client-history.data';

export type ClientHistoryData = {
  data: {
    total: number;
    content: {
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
    }[];
  };
};

export const getClientHistory = async (params): Promise<any> => {
  console.log('getClientHistory', params);
  // const offset:number = params.pagination.offset;
  const limit = params.pagination.limit;
  const offset = params.pagination.page * limit - limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response: ClientHistoryData = {
        data: {
          content: clientHistoryData.slice(offset, endIndex),
          total: clientHistoryData.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
