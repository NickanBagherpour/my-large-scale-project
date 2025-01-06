export type ScopeListDataType = {
  id: number;
  description: null | string;
  name: null | string;
};

export type TypeScopeListParams = {
  searchField: string;
  page: number;
  pageSize: number;
};

export type Scope = {
  id: number;
  name: string;
  description: string;
};

export type ScopeRequestParams = {
  'search-field': string;
  page: number;
  size: number;
  sort: string;
};
