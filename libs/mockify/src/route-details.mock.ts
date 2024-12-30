import { routeDetailsData } from './data/route-details.data';

export const RouteDetails = async (): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: routeDetailsData,
      };
      resolve(response);
    }, 1500);
  });
};
