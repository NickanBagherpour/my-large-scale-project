import { createQueryKeys } from '../../create-query-keys';

const prefix = 'CLIENTS-LIST';
export const KEYS = createQueryKeys(prefix, ['CLIENTS', 'DRAFTS', 'CLIENT_PLUGINS', 'CLIENT_SERVICE_PLUGINS']);
