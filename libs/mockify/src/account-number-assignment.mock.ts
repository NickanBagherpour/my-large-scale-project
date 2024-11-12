import { accountNumberAssignmentData } from './data/account-number-assignment.data';

export const getAccountNumberAssignment = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: accountNumberAssignmentData.slice(offset, endIndex),
        total: accountNumberAssignmentData.length,
      };
      resolve(response);
    }, 2500);
  });
};

export const putAccountNumberAssignment = async (params): Promise<any> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 2500);
  });
};
