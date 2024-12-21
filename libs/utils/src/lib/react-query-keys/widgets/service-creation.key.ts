import { createQueryKeys } from '../create-query-keys';

const prefix = 'SERVICE_CREATION';
export const KEYS = createQueryKeys(prefix, [
  'SCOPES',
  'SERVICE',
  'ROUTE',
  'UPSTREAMS',
  'UPSTREAM_WITH_ID',
  'TAGS',
  'CATEGORIES',
  'SERVICE_ACCESS',
  'THROUGHPUT',
  'SCOPE',
]);
