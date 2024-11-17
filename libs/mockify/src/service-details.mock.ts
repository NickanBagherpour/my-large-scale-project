import { serviceDetailsData } from './data/service-details.data';

export const ServiceDetails = async (): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: serviceDetailsData,
      };
      resolve(response);
    }, 1500);
  });
};
