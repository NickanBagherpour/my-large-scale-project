export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[1];
export const INITIAL_PAGE = 1;
export const ALL_STATUS_LIST = null;

export enum SORT_ORDER {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

// status-enums
export const COMMERCIAL_STATUS_LIST = {
  FINAL_APPROVED: 1,
  INITIAL_APPROVED: 2,
  REJECTED: [3, 4] as const,
  UNDER_REVIEW: [5, 6] as const,
} as const;

export enum BUSINESS_STATUS_LIST {
  ALL = 1,
  NONCOMMERCIAL = 2,
  COMMERCIAL = 3,
}

// roles-enums
export enum BusinessUserRole {
  COMMERCIAL_BANKING_ADMIN = 'commercial-banking-admin',
  BUSINESS_ADMIN = 'business-admin',
}
export const ALLOWED_ROLES = ['commercial-banking-admin', 'business-admin'];
export enum BusinessStatusBadge {
  UNDER_REVIEW_COMMERCIAL_BANK = 2,
  REJECTED_BY_COMMERCIAL_BANK = 3,
  APPROVED_BY_COMMERCIAL_BANK = 4,
  UNDER_REVIEW_BUSINESS_UNIT = 5,
  REJECTED_BY_BUSINESS_UNIT = 6,
  APPROVED_BY_BUSINESS_UNIT = 7,
}
