import { grantType } from './data/grant-type';

export const getGrantTyp = async (): Promise<any> => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: grantType,
          total: grantType.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
