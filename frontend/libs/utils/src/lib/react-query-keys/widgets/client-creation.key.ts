import { createQueryKeys } from '../create-query-keys';

const prefix = 'CLIENT_CREATION';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
