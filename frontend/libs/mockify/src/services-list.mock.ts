import { servicesList, drafts, type Service } from './data/services-list.data';

type Params = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  // sort: 'ascending ' | 'descending ';
  status: 'all' | 'active' | 'inactive';
  page: number;
};

export const CLIENTS_LIST_LIMIT = 16;

// function sortByDate(services: Service[], order: 'newest' | 'oldest'): Service[] {
//   return services.sort((a, b) => {
//     const dateA = a.name.split('/').map(Number);
//     const dateB = b.name.split('/').map(Number);

//     const yearDiff = dateA[0] - dateB[0];
//     const monthDiff = dateA[1] - dateB[1];
//     const dayDiff = dateA[2] - dateB[2];

//     let comparisonResult = yearDiff || monthDiff || dayDiff;

//     if (order === 'newest') {
//       comparisonResult = -comparisonResult;
//     }

//     return comparisonResult;
//   });
// }

function sortByName(services: Service[], order: 'newest' | 'oldest'): Service[] {
  return services.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    const comparisonResult = nameA.localeCompare(nameB);

    // if (order === 'newest') {
    //   return -comparisonResult;
    // }
    if (order === 'oldest') {
      return -comparisonResult;
    }

    return comparisonResult;
  });
}

export const getServicesList = async ({ searchTerm, status, sort, page }: Params) => {
  const data = servicesList
    .slice(0, 40)
    .filter((service) => {
      const searchMatches = service.name.includes(searchTerm) || service.scope.includes(searchTerm);
      if (status === 'all') {
        return searchMatches;
      } else {
        const isActive = status === 'active';
        return searchMatches && service.status === isActive;
      }
    })
    .slice(0, page * CLIENTS_LIST_LIMIT);

  // const sortedData = sortByDate(data, sort);
  const sortedData = sortByName(data, sort);

  return new Promise<{ data: { list: Service[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: sortedData, total: servicesList.length } });
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
