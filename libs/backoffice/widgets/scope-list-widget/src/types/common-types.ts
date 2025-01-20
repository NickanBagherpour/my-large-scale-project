import { PaginatedData } from '@oxygen/types';

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
  'search-field'?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type ScopeListItem = {
  description: string;
  id: number;
  name: string;
};

export type ScopeListData = PaginatedData<ScopeListItem>;
