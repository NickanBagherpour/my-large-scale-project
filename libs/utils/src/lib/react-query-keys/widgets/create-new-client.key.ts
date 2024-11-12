import { createQueryKeys } from '../create-query-keys';

const prefix = 'CREATE_NEW_CLIENT';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
