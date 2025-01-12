import { createQueryKeys } from '../create-query-keys';

const prefix = 'REPORTS';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
