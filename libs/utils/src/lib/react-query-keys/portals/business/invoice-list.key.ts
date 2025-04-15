import { createQueryKeys } from '../../create-query-keys';

const prefix = 'INVOICE_LIST';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
