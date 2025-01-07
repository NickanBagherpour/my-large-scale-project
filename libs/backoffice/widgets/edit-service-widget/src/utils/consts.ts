import { ServiceInfoDto } from '../types/edit-service.type';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const FORM_ITEM_NAMES = {
  id: 'serviceInfoId',
  enName: 'name',
  faName: 'persianName',
  tags: 'tags',
  access: 'accessLevel',
  category: 'category',
  throughput: 'throughput',
  version: 'version',
  owner: 'owner',
} as const satisfies Record<string, keyof ServiceInfoDto>;
