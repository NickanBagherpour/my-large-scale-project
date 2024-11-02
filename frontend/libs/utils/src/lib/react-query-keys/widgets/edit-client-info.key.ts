import { createQueryKeys } from '../create-query-keys';

const prefix = 'EDIT_CLIENT_INFO';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH', 'GRANT_TYPE', 'TAGS']);
