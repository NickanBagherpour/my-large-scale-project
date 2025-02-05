export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const INITIAL_DRAFTS_PAGE_SIZE = 4;

export const UPLOAD_SERVICE_NAMES = {
  uploadService: 'uploadService',
};
export const SERVICE_NAME = {
  ServiceName: 'serviceName',
};
export enum InquiryStatus {
  'SERVICE_ALREADY_EXISTS' = 1,
  'SERVICE_IS_DRAFT' = 2,
  'SERVICE_NOT_FOUND' = 3,
  'SERVICE_EXISTS_IN_BAAM' = 4,
}
