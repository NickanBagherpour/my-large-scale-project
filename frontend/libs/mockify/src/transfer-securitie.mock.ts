import { personDetails } from './data/person-details.data';

export const getUserData = async (params): Promise<any> => {
  //   const offset = params.pagination.offset;
  //   const limit = params.pagination.limit;
  //   const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    const result = personDetails.find((item) => item.national_code === params);
    setTimeout(() => {
      const response = {
        data: {
          content: result,
          total: personDetails.length,
        },
      };
      resolve(response);
    }, 2500);
  });

  return data;
};
