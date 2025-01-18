import { createQueryKeys } from '../../create-query-keys';

const prefix = 'REQUEST_MANAGEMENT';
export const KEYS = createQueryKeys(prefix, ['REQUESTS', 'DRAFTS']);
