import { createQueryKeys } from '../../create-query-keys';

const prefix = 'EDIT_APPLICANT_INFO';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'SEARCH', 'APPLICANT_INFO', 'CLIENT_INFO', 'CLIENT_TYPES']);
