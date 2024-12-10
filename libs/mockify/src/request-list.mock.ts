import { requestListData } from './data/request-list.data';
import { RequestListType } from '@oxygen/types';

function sortByDate(requests: RequestListType[], order: 'newest' | 'oldest'): RequestListType[] {
  return requests.sort((a, b) => {
    const dateA = a.registration_date.split('/').map(Number);
    const dateB = b.registration_date.split('/').map(Number);

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

export const getRequestList = async (params) => {
  const data = requestListData.filter((request) => {
    const searchMatches = request.organization_name.includes(params.searchTerm);
    switch (params.status) {
      case 'all':
        return searchMatches;
      case 'confirmed':
        return searchMatches && request.status === 'confirmed';
      case 'rejected':
        return searchMatches && request.status === 'rejected';
      case 'pending':
        return searchMatches && request.status === 'pending';
      default:
        return searchMatches;
    }
  });

  const sortedData = sortByDate(data, params.sort);

  return new Promise<{ data: { list: any[]; total: number } }>((resolve) => {
    setTimeout(() => {
      const start = (params.pagination.page - 1) * params.pagination.rowsPerPage;
      const end = start + params.pagination.rowsPerPage;
      resolve({ data: { list: sortedData.slice(start, end), total: sortedData.length } });
    }, 700);
  });
};
