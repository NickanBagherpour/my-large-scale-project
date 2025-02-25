export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[1];
export const INITIAL_PAGE = 1;

export enum SORT_ORDER {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export const SERVICE_STATUS = {
  ISACTIVE: true,
  NOTACTIVE: false,
  ALLSTATES: null,
} as const;

export const FILTER_FORM_ITEM_NAMES = {
  search_by_name: 'search_by_name',
};
