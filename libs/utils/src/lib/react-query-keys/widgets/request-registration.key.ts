import { createQueryKeys } from '../create-query-keys';

const prefix = 'REQUEST_REGISTRATION';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
