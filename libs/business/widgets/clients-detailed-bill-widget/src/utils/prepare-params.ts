import { Sort } from '@oxygen/types';
import { WidgetStateType } from '../context';
import { ReportsParams } from '../types';
import { clientTypeMap } from './consts';

export const prepareParams = (state: WidgetStateType): ReportsParams => {
  const { month, sort, year, clientType, searchTerm, page, size } = state;

  const params = {
    year,
    sort: (sort === 'newest' ? 'createDate,DESC' : 'createDate,ASC') as Sort,
    month,
    page: page - 1,
    size,
    'client-type': clientTypeMap[clientType],
    'search-field': searchTerm,
  };

  return Object.entries(params).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {} as ReportsParams
  );
};
