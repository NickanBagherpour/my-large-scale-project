import { PaginatedData, ParamsWithPagination } from './shared.type';

export type ScopesParams = ParamsWithPagination<{
  'scope-name': string;
}>;

export type Scope = {
  name: string;
  description: string | null;
};

export type ScopesData = PaginatedData<Scope>;
