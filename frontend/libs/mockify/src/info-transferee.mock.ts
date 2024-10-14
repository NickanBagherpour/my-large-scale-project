import { TransfereeInformation } from './data/transferee-information.data';

export const getInfoTransferee = async (params): Promise<any> => {
  //   const offset = params.pagination.offset;
  //   const limit = params.pagination.limit;
  //   const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    const result = TransfereeInformation.find((item) => item.national_code === params);
    setTimeout(() => {
      const response = {
        data: {
          content: result,
          total: TransfereeInformation.length,
        },
      };
      resolve(response);
    }, 2500);
  });

  return data;
};
