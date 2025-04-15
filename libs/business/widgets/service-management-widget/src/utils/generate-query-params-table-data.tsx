import { SERVICE_MANAGEMENT_STATUS } from '../context/types';
import { SORT_ORDER } from './consts';

type GenerateQueryParamsType = {
  sort: SORT_ORDER;
  page: number;
  size: number;
  serviceName?: string;
  isCommercial?: boolean;
};
export const generateQueryParams = (state) => {
  const params: GenerateQueryParamsType = {
    sort: state.sort,
    page: state.table.pagination.page - 1,
    size: state.table.pagination.size,
  };

  const serviceName = state.searchValue;
  const isCommercial = state.status;

  if (serviceName && serviceName.trim() !== '') {
    params.serviceName = serviceName;
  }

  if (isCommercial !== SERVICE_MANAGEMENT_STATUS.ALL) {
    params.isCommercial = isCommercial;
  }

  return params;
};
