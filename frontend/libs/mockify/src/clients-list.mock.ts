import { clientsList, type Client } from './data/clients-list.data';

export type WidgetStateType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  page: number;
  // errorMessage: Nullable<ErrorMessageType>;
};

function sortByDate(clients: Client[], order: 'newest' | 'oldest'): Client[] {
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

export const getClients = async ({ searchTerm, status, sort, page }: WidgetStateType) => {
  const data = clientsList
    .filter((client) => {
      const isActiveInTheService = status === 'active';
      return client.description.includes(searchTerm) && isActiveInTheService;
    })
    .slice(page - 1, 16);

  const sortedData = sortByDate(data, sort);

  return new Promise<{ data: Client[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: sortedData });
    }, 700);
  });
};
