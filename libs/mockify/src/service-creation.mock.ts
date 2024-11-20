import { Pagination, Scope } from '@oxygen/types';
import { items } from './data/service-creation.data';

export const getScopes = async (pagination: Pagination) => {
  const { page, rowsPerPage } = pagination;
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return new Promise<{ data: { items: Scope[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { items: items.slice(start, end), total: items.length } });
    }, 700);
  });
};
