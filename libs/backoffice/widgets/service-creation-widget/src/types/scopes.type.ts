import { PaginatedData, ParamsWithPagaination } from './shared.type';

export type ScopesParams = ParamsWithPagaination<{
  'search-field': string;
}>;

export type Scope = {
  name: string;
  description: string | null;
  id: number;
  ssoScopeId: number | null;
};

export type ScopesData = PaginatedData<Scope>;

export type scopeToServiceParams = {
  scopeName: string;
  serviceName: string;
};

export type ServiceScope = Scope & {
  isServiceInSso: boolean;
};
