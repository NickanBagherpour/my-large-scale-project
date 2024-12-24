import { Pagination, Scope } from '@oxygen/types';
import { items } from './data/service-creation.data';

type Params = {
  pagination: Pagination;
  name: string;
};

export const getScopes = async (params: Params) => {
  const {
    pagination: { page, rowsPerPage },
    name,
  } = params;

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return new Promise<{ data: { items: Scope[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: { items: items.filter((scope) => scope.scopeName.includes(name)).slice(start, end), total: items.length },
      });
    }, 700);
  });
};
