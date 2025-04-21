import { createQueryKeys } from '../../create-query-keys';

const prefix = 'DETAILED_BILL_REPORT';
export const KEYS = createQueryKeys(prefix, ['INFO', 'FINANCIAL', 'NON_FINANCIAL']);
