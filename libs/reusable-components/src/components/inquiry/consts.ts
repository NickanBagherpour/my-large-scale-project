import { ROUTES } from '@oxygen/utils';
import { API_PREFIX } from '@oxygen/client';

export enum InquiryStatus {
  'IS_OPERATIONAL' = 1,
  'IS_DRAFT' = 2,
  'NOT_FOUND' = 3,
  'EXISTS_IN_BAM' = 4,
}
export enum ServiceInquiryStatus {
  'SERVICE_IS_OPERATIONAL' = 1,
  'SERVICE_IS_DRAFT' = 2,
  'SERVICE_NOT_FOUND' = 3,
  'SERVICE_EXISTS_IN_BAM' = 4,
}
export enum ClientInquiryStatus {
  'CLIENT_IS_OPERATIONAL' = 1,
  'CLIENT_IS_DRAFT' = 2,
  'CLIENT_NOT_FOUND' = 3,
  'CLIENT_EXISTS_IN_BAM' = 4,
}
export const INQUIRY = {
  ItemName: 'name',
} as const;
export const API_URLS = {
  service: `${API_PREFIX.PUBLISHER}/v1/services/inquiry-service-status`,
  client: `${API_PREFIX.PUBLISHER}/v1/clients/inquiry-client-status`,
} as const;
export const UPLOAD_URLS = {
  service: '/v1/services/import-service?service-name=',
  client: '/v1/clients/inquiry-client-status',
} as const;

export const NAVIGATION_URLS = {
  service: ROUTES.BACKOFFICE.SERVICE_CREATION + '?service-name=',
  client: ROUTES.BACKOFFICE.CLIENT_CREATION + '?client-name=',
};
