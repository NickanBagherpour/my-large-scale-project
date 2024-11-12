import { createQueryKeys } from '../create-query-keys';

const prefix = 'APPLICANT_HISTORY';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH']);
