import { createQueryKeys } from '../create-query-keys';

const prefix = 'UPSTREAM_LIST';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'GET_UPSTREAM_SERVICES', 'SEARCH']);
