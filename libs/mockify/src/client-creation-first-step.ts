import { clientInfo, plugins, services } from './data/client-details.data';
import type { Pagination, Service, ClientInfo, Plugin } from '@oxygen/types';
import { grantType } from './data/grant-type';
import { TagsData } from './data/tags';
import { selectOptions } from './data/select-options.data';

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

export const getGrantTags = async () => {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => {
      resolve({ data: grantType });
    }, 1500);
  });
};
export const getNameTags = async () => {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => {
      resolve({ data: TagsData });
    }, 1000);
  });
};
export const getSelectOptions = async () => {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => {
      resolve({ data: selectOptions });
    }, 2500);
  });
};

export const getPlugins = async () => {
  return new Promise<{ data: Plugin[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: plugins });
    }, 700);
  });
};

// export const clientCreationTable = async (params): Promise<any> => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const response = {
//         data: {
//           serviceName: 'samat-lc-gutr-del',
//           persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
//           scope: 'svc-mgmt-iban-inq',
//           url: 'localhost:3000/services',
//           version: 'V 1.1',
//           status: 'status',
//           details: 'details',
//           remove: 'remove',
//         },
//       };
//       resolve(response);
//       // reject({error: 'error'});
//     }, 2500);
//   });
// };
