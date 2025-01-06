import { ServiceInfoDto } from '../types/get-service.type';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const FORM_ITEM_NAMES: Record<string, keyof ServiceInfoDto> = {
  id: 'serviceInfoId',
  enName: 'serviceLatinName',
  faName: 'servicePersianName',
  tag: 'tags',
  method: 'routeMethod',
  protocol: 'serviceProtocol',
  // access: acces,
  category: 'serviceCategoryTitle',
  throughput: 'throughput',
  version: 'serviceVersion',
  owner: 'ownerName',
  path: 'routePath',
  host: 'routeHosts',
  upstream: 'upstreamTitle',
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
