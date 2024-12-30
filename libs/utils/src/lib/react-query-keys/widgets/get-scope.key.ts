import { createQueryKeys } from '../create-query-keys';

const prefix = 'GET_SCOPE';
export const KEYS = createQueryKeys(prefix, ['SEARCH', 'SERVICE_SCOPE', 'GET_LIST', 'DRAFTS']);
