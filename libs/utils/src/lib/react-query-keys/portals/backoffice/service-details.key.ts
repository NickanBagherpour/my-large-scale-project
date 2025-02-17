import { createQueryKeys } from '../../create-query-keys';

const prefix = 'SERVICE_DETAILS';
export const KEYS = createQueryKeys(prefix, [
  'GET_LIST',
  'GET_UPSTREAM_LIST',
  'SEARCH',
  'UPSTREAM_TAB_CARDS_DETAILS',
  'UPSTREAM_TAB_CARD_DETAILS',
  'DOCUMENTATION_TAB_DOCUMENT_LIST',
]);
