import { createQueryKeys } from '../create-query-keys';

const prefix = 'GET_SCOPE';
export const KEYS = createQueryKeys(prefix, ['SEARCH', 'GET_LIST', 'DRAFTS']);
