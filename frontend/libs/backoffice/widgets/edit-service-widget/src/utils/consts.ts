export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const FORM_ITEM_NAMES = {
  id: 'id',
  enName: 'enName',
  faName: 'faName',
  tag: 'tag',
  method: 'method',
  protocol: 'protocol',
  access: 'access',
  category: 'category',
  throughout: 'throughout',
  version: 'version',
  owner: 'owner',
  path: 'path',
  host: 'host',
  upstream: 'upstream',
};
export const protocolOptions = [
  { value: '1', label: 'Post' },
  { value: '2', label: 'Delete' },
  { value: '3', label: 'Get' },
];

export const accessOptions = [
  { value: '1', label: 'PUBLIC' },
  { value: '2', label: 'PRIVATE' },
];
export const categoryOptions = [
  { value: '1', label: 'ACCOUNT' },
  { value: '2', label: 'FREE' },
];
export const throughoutOptions = [
  { value: '1', label: 'Unlimited' },
  { value: '2', label: 'Limited' },
];
export const upstreamOptions = [
  { value: '1', label: 'ICMS -XzxcZ' },
  { value: '2', label: 'IBMS -XzxcZ' },
];

export const tagOptions = [
  { value: '1', label: 'CUSTOMER' },
  { value: '2', label: 'BACKOFFICE' },
];
