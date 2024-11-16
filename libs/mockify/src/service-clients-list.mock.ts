import { serviceClientsListData } from './data/service-clients-list.data';

export const ServiceClientsList = async (): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: serviceClientsListData,
      };
      resolve(response);
    }, 1500);
  });
};
