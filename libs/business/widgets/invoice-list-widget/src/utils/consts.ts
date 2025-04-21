// constants.ts
export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[1];
export const INITIAL_PAGE = 1;
export const ALL_STATUS_LIST = null;

export enum SORT_ORDER {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export const MAX_LENGTH = 100;

// status-enums

export enum BillingIssueStatus {
  COMMERCIAL_BANK_ISSUED = 1, // در انتظار کسب و کار
  OPERATION_ISSUED = 2, // در انتظار بانکداری تجاری
  ISSUED, //صادر شده
  DELETED,
}

export enum ClientType {
  client = 'client',
  aggregator = 'aggregator',
}

export const years = Array.from({ length: 1405 - 1394 }, (_, index) => {
  const year = (1394 + index).toString();
  return { text: year, value: year };
});

export const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
].map((month, index) => ({
  text: `${String(index + 1).padStart(2, '0')} / ${month}`,
  value: String(index + 1).padStart(2, '0'),
}));
