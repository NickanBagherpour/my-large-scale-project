import { createQueryKeys } from '../../create-query-keys';

const prefix = 'SERVICE_CALL_LOG';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
