import { createQueryKeys } from '../../create-query-keys';

const prefix = 'CLIENTS_DETAILED_BILL';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
