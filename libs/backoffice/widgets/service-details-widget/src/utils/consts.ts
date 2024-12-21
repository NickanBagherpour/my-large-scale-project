export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;
export const MAX_LENGTH = 100;
export const MAX_LENGTH_INPUT = 100;

export const RADIO_GROUP_NAME = {
  CREATE: 'create',
  SELECT: 'select',
};
export const UPSTREAM_TAB_NAMES_FORM_ITEM = {
  FORM_NAME: 'upstream_names',
  ENGLISH_NAME: 'english_name',
  PERSIAN_NAME: 'persian_name',
};

export const ADD_SERVER_MODAL_FORM_ITEM = {
  DOMAIN: 'domain',
  WEIGHT: 'weight',
  HEALTH: 'health',
  ADD_SERVER: 'add_server',
};

export const FORM_ITEM_NAMES = {
  englishName: 'englishName',
  persianName: 'persianName',
  actionOrMethod: 'actionOrMethod',
  protocole: 'protocole',
  access: 'access',
  category: 'category',
  throughout: 'throughout',
  version: 'version',
  owner: 'owner',
  tag: 'tag',
  path: 'path',
  host: 'host',
  upstream: 'upstream',
} as const;

export const UPLOAD_NAMES = {
  file: 'file',
} as const;

export const CREATE_SCOPE_NAMES = {
  scopeName: 'scopeName',
  persianScopeName: 'persianScopeName',
} as const;

export const IMPORT_FORM_SSO_NAMES = {
  scopeName: 'scopeName',
} as const;
