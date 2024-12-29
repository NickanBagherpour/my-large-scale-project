import { backofficeMenu, businessMenu, customerMenu } from './data/menu.data';

export const getBakofficeMenu = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: backofficeMenu,
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
        data: businessMenu,
      };

      resolve(response);
    }, 400);
  });
};

export const getCustomerMenu = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: customerMenu,
      };

      resolve(response);
    }, 400);
  });
};
