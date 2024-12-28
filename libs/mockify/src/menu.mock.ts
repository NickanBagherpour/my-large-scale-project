import { backofficeMenus, businessMenus } from './data/menu.data';

export const getBakofficeMenu = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: backofficeMenus,
      };

      resolve(response);
      // reject(Error('Mock error'));
    }, 400);
  });
};

export const getBusinessMenu = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: businessMenus,
      };

      resolve(response);
    }, 400);
  });
};
