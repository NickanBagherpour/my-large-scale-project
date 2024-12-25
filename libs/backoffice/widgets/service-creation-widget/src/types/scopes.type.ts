export type ScopesParams = {
  'scope-name': string;
};

export type Scope = {
  name: string;
  description: string | null;
  id: number;
};

export type ScopesData = Scope[];

export type AssignScopeToServiceParams = {
  scopeName: string;
  serviceName: string;
};
