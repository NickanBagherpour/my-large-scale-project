import { AllTransferInformation } from './data/all-transfer-information';

export const getAllTransferInformation = async (params): Promise<any> => {
  //   const offset = params.pagination.offset;
  //   const limit = params.pagination.limit;
  //   const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    // const result = personDetails.find((item) => item.national_code === params);
    setTimeout(() => {
      const response = {
        data: {
          content: AllTransferInformation[0],
          total: AllTransferInformation.length,
        },
      };
      resolve(response);
    }, 2500);
  });

  return data;
};
