import { scopeHistoryData } from '@oxygen/types';
import { scopeChangeHistoryData } from './data/scope-change-history.data';

export const getScopeChangeHistory = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  return await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        content: scopeChangeHistoryData.slice(offset, endIndex),
        total: scopeChangeHistoryData.length,
      };

      resolve(response);
    }, 2500);
  });
};
