export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const ALL_STATUS_LIST = null;
export const SORT_ORDER = {
  ASCENDING: 'desc',
  DESCENDING: 'createDate',
};
export const MAX_LENGTH = 100;

export enum CUSTOMER_STATUS_LIST {
  UNDER_REVIEW = 1,
  REJECTED = 2,
  APPROVED = 3,
}
