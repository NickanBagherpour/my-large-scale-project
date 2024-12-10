import type { Pagination } from '@oxygen/types';
import { requestListData } from './data/request-list.data';

export const getRequestList = async ({ page, rowsPerPage }: Pagination) => {
  return new Promise<{ data: { list: any[]; total: number } }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({ data: { list: requestListData.slice(start, end), total: requestListData.length } });
    }, 700);
  });
};
