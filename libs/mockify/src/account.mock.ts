import { customerAccounts } from './data/user-accounts.data';

export const getCustomerAccounts = async (params): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: customerAccounts,
      };
      resolve(response);
      // reject({error: 'error'});
    }, 1500);
  });
};

export const getAccountAmount = async (params): Promise<any> => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: customerAccounts.find((item) => item.accountNumber === params.accountNumber),
      };
      resolve(response);
      reject({ error: 'error' });
    }, 1100);
  });

  return data;
};
