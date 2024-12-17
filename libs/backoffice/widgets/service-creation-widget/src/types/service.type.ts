export type ServiceParams = {
  name: string | null;
};

export type Service = {
  name: string;
  persianName: string;
  accessLevel: number;
  category: number;
  throughout: number;
  version: string;
  owner: string;
  tag: string;
};
