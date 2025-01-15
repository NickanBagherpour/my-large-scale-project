import { createQueryKeys } from '../../create-query-keys';

const prefix = 'SCOPE_MANAGEMENT';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH', 'GET_SCOPE_LIST']);
