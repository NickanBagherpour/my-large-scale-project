import { scopeHistoryData } from '@oxygen/types';
import { scopeChangeHistoryData } from './data/scope-change-history.data';

export const getScopeChangeHistory = async ({ page, rowsPerPage }) => {
  return new Promise<{ data: { content: scopeHistoryData[]; total: number } }>((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { content: scopeChangeHistoryData, total: scopeChangeHistoryData.length } });
    }, 700);
  });
};
