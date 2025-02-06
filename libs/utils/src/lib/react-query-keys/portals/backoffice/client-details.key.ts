import { createQueryKeys } from '../../create-query-keys';

const prefix = 'CLIENT_DETAILS';
export const KEYS = createQueryKeys(prefix, ['CLIENT_INFO', 'SERVICES', 'PLUGINS', 'CLIENT_TYPES']);
