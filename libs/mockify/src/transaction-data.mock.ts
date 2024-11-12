import { CustomerTransactionsData, RevertTransactionData, TransactionData } from './data/transaction.data';

// export const getTransactionDataById = async (): Promise<any> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const response = {
//         data: TransactionData,
//       };

//       resolve(response);
//     }, 500);
//   });
// };
export const getRealCustomerTransactionsByCustomerCode = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: CustomerTransactionsData.slice(offset, endIndex),
          total: CustomerTransactionsData.length,
        },
      };
      resolve(response);
    }, 1500);
  });

  return data;
};
// export const getLegalCustomerTransactionsByCustomerCode = async (params): Promise<any> => {
//   const offset = params.pagination.offset;
//   const limit = params.pagination.limit;
//   const endIndex = offset + limit;
//   const data = await new Promise((resolve) => {
//     setTimeout(() => {
//       const response = {
//         data: {
//           content: CustomerTransactionsData.slice(offset, endIndex),
//           total: CustomerTransactionsData.length,
//         },
//       };
//       resolve(response);
//     }, 1500);
//   });

//   return data;
// };
// export const getForeignCustomerTransactionsByCustomerCode = async (params): Promise<any> => {
//   const offset = params.pagination.offset;
//   const limit = params.pagination.limit;
//   const endIndex = offset + limit;
//   const data = await new Promise((resolve) => {
//     setTimeout(() => {
//       const response = {
//         data: {
//           content: CustomerTransactionsData.slice(offset, endIndex),
//           total: CustomerTransactionsData.length,
//         },
//       };
//       console.log('resolveee', response);
//       resolve(response);
//     }, 1500);
//   });

//   return data;
// };

export const revertTransactionById = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: RevertTransactionData,
      };

      resolve(response);
    }, 500);
  });
};
