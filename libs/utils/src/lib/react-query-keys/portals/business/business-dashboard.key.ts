import { createQueryKeys } from '../../create-query-keys';

const prefix = 'BUSINESS_DASHBOARD';
export const KEYS = createQueryKeys(prefix, [
  'GET_LIST',
  'SEARCH',
  'REPORT_CARD',
  'TOP_METRICS_CARD',
  'STATUS_CARD',
  'AGGRIGATOR',
  'FEE_DISTRIBUTION',
  'REQUEST_STATUS',
]);
