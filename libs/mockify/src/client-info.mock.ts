import { clientInfoData } from './data/client-info.data';

export const getClientInfo = async (reqId): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: clientInfoData.find((item) => item.requestId == reqId),
      };
      resolve(response);
    }, 1500);
  });
};
