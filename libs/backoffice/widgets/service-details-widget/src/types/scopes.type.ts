import { PaginatedData, ParamsWithPagaination } from './shared.type';
import { Nullable } from '@oxygen/types';

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
  scopeName: Nullable<string>;
  serviceName: Nullable<string>;
};
