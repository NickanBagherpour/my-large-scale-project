import { menus } from './data/menu.data';

export const getMenus = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: menus,
      };

      resolve(response);

    }, 700);
  });
};