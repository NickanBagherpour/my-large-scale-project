
export const getCalculateInterestSale = async (params): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: {
          "responseId": 0,
          "serviceTypeCode": 0,
          "stampAmount": 25000,
          "count": params?.count,
          "parValue": 100000,
          "withdrawalAmount": 23131213130,
          "saleInterestAmount": 654545
        },
      };
      resolve(response);
      // reject({error: 'error'});
    }, 1500);
  });
};