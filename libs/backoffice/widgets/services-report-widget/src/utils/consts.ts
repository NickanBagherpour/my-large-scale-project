export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[1];
export const INITIAL_PAGE = 1;

export const ALL_STATUS_LIST = 'all';

export enum SERVICE_STATUS_LIST {
  ACTIVE = 'active',
  UNACTIVE = 'unActive',
}

export enum SORT_ORDER {
  ASCENDING = 'desc',
  DESCENDING = 'createDate',
}

export enum SERVICE_STATUS {
  ACTIVE,
  INACTIVE,
}

export const FILTER_FORM_ITEM_NAMES = {
  search_by_name: 'search_by_name',
};
