import { createQueryKeys } from '../create-query-keys';

const prefix = 'CLIENTS-LIST';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'DRAFTS']);
