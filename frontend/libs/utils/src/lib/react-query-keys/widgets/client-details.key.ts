import { createQueryKeys } from '../create-query-keys';

const prefix = 'CLIENT_DETAILS';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
