import { createQueryKeys } from '../../create-query-keys';

const prefix = 'CLIENT_CREATION';
export const KEYS = createQueryKeys(prefix, [
  'TABLE_DATA',
  'MAIN_CARD',
  'GRANT_TAG',
  'NAME_TAG',
  'SELECT_OPTIONS',
  'ORGANIZATION_INFO',
]);
