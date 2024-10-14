import { createQueryKeys } from '../create-query-keys';

const prefix = 'REQUESTS';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'ACCOUNT_TYPE', 'ORGANIZATION_NAME']);
