import { createQueryKeys } from '../../create-query-keys';

const prefix = 'META';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
