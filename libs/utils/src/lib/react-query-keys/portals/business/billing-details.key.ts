import { createQueryKeys } from '../../create-query-keys';

const prefix = 'BILLING_DETAILS';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
