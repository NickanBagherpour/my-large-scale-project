export type PostServiceParams = {
  name: string;
  persianName: string;
  accessLevel: number;
  category: number;
  throughout: number;
  version: string;
  owner: string;
  tag: string;
};

export type Service = {
  name: string;
  persianName: string;
  accessLevel: number;
  category: number;
  throughout: number;
  version: string;
  owner: string;
  tags: {
    id: number;
    title: string;
  }[];
};

export type Route = {
  method: string;
  protocol: string;
  path: string;
  host: string;
};

export type Tags = {
  id: number;
  title: string;
}[];

export type CodeTitle = {
  code: number;
  title: string;
};
