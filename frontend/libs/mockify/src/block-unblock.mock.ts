import { accounts } from './data/accounts.data';

export const getCustomerOtherAccounts = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: accounts.slice(offset, endIndex),
        total: accounts.length,
      };
      resolve(response);
    }, 2500);
  });
};
