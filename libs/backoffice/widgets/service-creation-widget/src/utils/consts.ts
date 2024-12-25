export const UPSTREAMS_PAGE_SIZE = 8; // Defined based on UI design requirements.
export const SCOPE_PAGE_SIZE = 10; // Value confirmed by the analysis team.

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

export const UPLOAD_NAMES = {
  file: 'file',
} as const;

export const IMPORT_FORM_SSO_NAMES = {
  existingScopeName: 'existingScopeName',
} as const;

export const ROUTE_NAMES = {
  actionOrMethod: 'actionOrMethod',
  protocol: 'protocol',
  path: 'path',
  host: 'host',
} as const;

export const ADD_SERVER_NAMES = {
  domainOrIpPort: 'domainOrIpPort',
  weight: 'weight',
  health: 'health',
} as const;
