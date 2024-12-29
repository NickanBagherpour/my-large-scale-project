export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;
export const ALL_STATUS_LIST = 1;
export const COMMERCIAL_STATUS_LIST = {
  UNDER_REVIEW: 2,
  REJECTED: 3,
  APPROVED: 4,
  INITIAL_APPROVED: 4,
};
export const BUSINESS_STATUS_LIST = {
  UNDER_REVIEW: 1,
  REJECTED: 2,
  APPROVED: 3,
};
export const SORT_ORDER = {
  ASCENDING: 'desc',
  DESCENDING: 'createDate',
};
export const BusinessUserRole = {
  COMMERCIAL_BANKING_ADMIN: 'commercial-banking-admin',
  BUSINESS_ADMIN: 'business-admin',
};
