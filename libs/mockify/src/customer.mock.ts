import { personDetails } from './data/person-details.data';
import { accounts } from './data/accounts.data';

export const getCustomerInfo = async (params): Promise<any> => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = personDetails.find((item) => item.national_code === params.nationalCode);
      const response = {
        data: result,
      };
      resolve(response);
      // reject({error: 'error'});
    }, 2500);
  });

  return data;
};

export const getAccounts = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: accounts.slice(offset, endIndex),
          total: accounts.length,
        },
      };

      resolve(response);
    }, 2000);
  });

  return data;
};
