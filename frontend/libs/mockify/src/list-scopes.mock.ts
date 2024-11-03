import type { Pagination } from '@oxygen/types';
import { listScopesData } from './data/list-scopes.data';

export const getScopesList = async ({ page, rowsPerPage }: Pagination) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({ data: { list: listScopesData.slice(start, end), total: listScopesData.length } });
    }, 700);
  });
};
