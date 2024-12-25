import { InquiryStatus } from '../types/get-Inquiry-info.type';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const UPLOAD_SERVICE_NAMES = {
  uploadService: 'uploadService',
};
export const SERVICE_NAME = {
  ServiceName: 'serviceName',
};
export const INQUIRY_STATUS: Record<1 | 2 | 3 | 4, InquiryStatus> = {
  1: 'SERVICE_ALREADY_EXISTS',
  2: 'SERVICE_IS_DRAFT',
  3: 'SERVICE_NOT_FOUND',
  4: 'SERVICE_EXISTS_IN_BAAM',
};
