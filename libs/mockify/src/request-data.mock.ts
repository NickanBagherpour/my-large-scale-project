import { requestData, drafts, type RequestInfo } from './data/request-data.data';

type Params = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  // sort: 'ascending ' | 'descending ';
  status: 'all' | 'active' | 'inactive';
  page: number;
};

export const CLIENTS_LIST_LIMIT = 16;

export const getRequestData = async () => {
  const data = requestData;

  return new Promise<{ data: { list: RequestInfo } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: data } });
    }, 700);
  });
};

export const getServicesDrafts = async () => {
  return new Promise<{ data: typeof drafts }>((resolve) => {
    setTimeout(() => {
      resolve({ data: drafts });
    }, 700);
  });
};
