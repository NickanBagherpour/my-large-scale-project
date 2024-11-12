import { products } from './data/products.data';

export const getReportData = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: products,
      };

      resolve(response);
    }, 500);
  });
};
