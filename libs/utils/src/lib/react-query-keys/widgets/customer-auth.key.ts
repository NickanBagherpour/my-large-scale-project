import { createQueryKeys } from '../create-query-keys';

const prefix = 'AUTH';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
