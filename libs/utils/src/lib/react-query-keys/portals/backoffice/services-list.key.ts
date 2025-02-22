import { createQueryKeys } from '../../create-query-keys';

const prefix = 'SERVICES_LIST';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'DRAFTS', 'INQUIRY', 'CLIENTS']);
