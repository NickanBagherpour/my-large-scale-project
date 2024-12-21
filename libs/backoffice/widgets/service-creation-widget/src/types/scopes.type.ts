export type ScopesParams = {
  'scope-name': string;
};

export type Scope = {
  name: string;
  description: string | null;
};

export type ScopesData = Scope[];
