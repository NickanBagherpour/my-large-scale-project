import { createQueryKeys } from '../../create-query-keys';

const prefix = 'UPSTREAM_SERVICE_HISTORY';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
