import { History, serviceHistory } from './data/service-history.data';

type Params = {
  pagination: {
    limit?: number;
    page?: number;
  };
};

export const SERVICE_HISTORY_LIST_LIMIT = 16;

export const getServiceHistory = async ({ pagination }: Params) => {
  const { limit = SERVICE_HISTORY_LIST_LIMIT, page = 1 } = pagination;

  const data = serviceHistory.slice((page - 1) * limit, page * limit);
  return new Promise<{ data: { list: History[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: data, total: serviceHistory.length } });
    }, 700);
  });
};
