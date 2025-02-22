import { createQueryKeys } from '../../create-query-keys';

const prefix = 'SCOPE_INFORMATION';
export const KEYS = createQueryKeys(prefix, ['GET_LIST', 'GET_EXCEL', 'GET_HISTORY_LIST', 'GET_MODAL_LIST']);
