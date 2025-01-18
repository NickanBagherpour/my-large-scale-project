import { createQueryKeys } from '../../create-query-keys';

const prefix = 'REQUEST_LIST';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH', 'REQUEST_MANAGEMENT']);
