import { PaginatedData, ParamsWithPagaination } from './shared.type';

export type ScopesParams = ParamsWithPagaination<{
  'scope-name': string;
}>;

export type Scope = {
  name: string;
  description: string | null;
  id: number;
};

export type ScopesData = PaginatedData<Scope>;

export type AssignScopeToServiceParams = {
  scopeName: string;
  serviceName: string;
};
