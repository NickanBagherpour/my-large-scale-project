import { clientInfo, services, plugins } from './data/client-info-details.data';
import type { Pagination, Service, ClientInfo, Plugin } from '@oxygen/types';

export const getClientInformation = async () => {
  return new Promise<{ data: ClientInfo }>((resolve) => {
    setTimeout(() => {
      resolve({ data: clientInfo });
    }, 700);
  });
};

export const getServices = async ({ page, rowsPerPage }: Pagination) => {
  return new Promise<{ data: { list: Service[]; total: number } }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({ data: { list: services.slice(start, end), total: services.length } });
    }, 700);
  });
};

export const getPlugins = async () => {
  return new Promise<{ data: Plugin[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: plugins });
    }, 700);
  });
};
