import { menus } from './data/business.menu';

export const getBusinessMenu = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: menus,
      };

      resolve(response);
    }, 700);
  });
};
