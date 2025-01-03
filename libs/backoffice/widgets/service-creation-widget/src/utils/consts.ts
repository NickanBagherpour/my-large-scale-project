export const UPSTREAMS_PAGE_SIZE = 8; // Defined based on UI design requirements.
export const SCOPE_PAGE_SIZE = 10; // Value confirmed by the analysis team.

export enum InquiryStatus {
  'SERVICE_ALREADY_EXISTS' = 1,
  'SERVICE_IS_DRAFT' = 2,
  'SERVICE_NOT_FOUND' = 3,
  'SERVICE_EXISTS_IN_BAAM' = 4,
}

export const FORM_ITEM_NAMES = {
  englishName: 'englishName',
  persianName: 'persianName',
  access: 'access',
  category: 'category',
  throughput: 'throughput',
  version: 'version',
  owner: 'owner',
  tags: 'tags',
} as const;

export const ROUTE_NAMES = {
  actionOrMethod: 'actionOrMethod',
  protocol: 'protocol',
  path: 'path',
  host: 'host',
} as const;
