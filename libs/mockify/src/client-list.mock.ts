import type { ClientType, ParamsType, OrganizationParamsType } from '@oxygen/types';
import { clientsList, drafts } from './data/client-list.data';

export const CLIENTS_LIST_LIMIT = 16;

function sortByDate(clients: ClientType[], order: 'newest' | 'oldest'): ClientType[] {
  return clients.sort((a, b) => {
    const dateA = a.date.split('/').map(Number);
    const dateB = b.date.split('/').map(Number);

    const yearDiff = dateA[0] - dateB[0];
    const monthDiff = dateA[1] - dateB[1];
    const dayDiff = dateA[2] - dateB[2];

    let comparisonResult = yearDiff || monthDiff || dayDiff;

    if (order === 'newest') {
      comparisonResult = -comparisonResult;
    }

    return comparisonResult;
  });
}

export const getClients = async ({ searchTerm, status, sort, page }: ParamsType) => {
  const data = clientsList
    .slice(0, 40)
    .filter((client) => {
      const searchMatches = client.description.includes(searchTerm);
      if (status === 'all') {
        return searchMatches;
      } else {
        const isActive = status === 'active';
        return searchMatches && client.isActiveInTheService === isActive;
      }
    })
    .slice(0, page * CLIENTS_LIST_LIMIT);

  const sortedData = sortByDate(data, sort);

  return new Promise<{ data: { list: ClientType[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: sortedData, total: clientsList.length } });
    }, 700);
  });
};

export const getOrganizations = async ({ searchTerm, status, sort, page }: OrganizationParamsType) => {
  const data = clientsList
    .slice(0, 40)
    // .filter((client) => {
    //   const searchMatches = client.description.includes(searchTerm);
    //   if (status === 'all') {
    //     return searchMatches;
    //   } else {
    //     const isActive = status === 'active';
    //     return searchMatches && client.isActiveInTheService === isActive;
    //   }
    // })
    .slice(0, page * CLIENTS_LIST_LIMIT);

  const sortedData = sortByDate(data, sort);

  return new Promise<{ data: { list: ClientType[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: sortedData, total: clientsList.length } });
    }, 700);
  });
};

export const getDrafts = async () => {
  return new Promise<{ data: typeof drafts }>((resolve) => {
    setTimeout(() => {
      resolve({ data: drafts });
    }, 700);
  });
};
