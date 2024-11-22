import { menus } from './data/customer.menu.data';

export const getCustomerMenus = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: menus,
      };

      resolve(response);
    }, 700);
  });
};
