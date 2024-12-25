export type ScopeListDataType = {
  id: number;
  description: null | string;
  name: null | string;
};

export type typeScopeListParams = {
  'search-field': string;
  page: number;
  size: number;
  sort: string;
};
