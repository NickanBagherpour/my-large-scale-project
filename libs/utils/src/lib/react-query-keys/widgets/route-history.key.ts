import { createQueryKeys } from '../create-query-keys';

const prefix = 'ROUTE_CHANGE_HISTORY';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
