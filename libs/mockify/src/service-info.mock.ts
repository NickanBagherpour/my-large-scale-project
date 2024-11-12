import { serviceInfoData } from './data/service-info.data';

export const getServiceInfo = async (id: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: serviceInfoData.find((item) => item.id == id),
      };
      resolve(response);
    }, 1500);
  });
};
