import { servicesList, type UpstreamDetails } from './data/upstream-details.data';

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

function sortByName(services: UpstreamDetails[], order: 'newest' | 'oldest'): UpstreamDetails[] {
  return services;
}

export const getUpstreamDetails = async ({ searchTerm, status, sort, page }: Params) => {
  const data = servicesList;

  return new Promise<{ data: { list: UpstreamDetails[]; total: number } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { list: data, total: 8 } });
    }, 700);
  });
};
