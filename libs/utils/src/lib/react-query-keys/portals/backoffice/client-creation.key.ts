import { createQueryKeys } from '../../create-query-keys';

const prefix = 'CLIENT_CREATION';
export const KEYS = createQueryKeys(prefix, [
  'NAME_TAG',
  'SELECT_OPTIONS',
  'ORGANIZATION_INFO',
  'INQUIRY_STATUS',
  'INQUIRY_SSO',
  'CLIENT_DRAFT_INFO',
  'UPDATE_PROGRESS',
  'CLIENT_INFO',
]);
