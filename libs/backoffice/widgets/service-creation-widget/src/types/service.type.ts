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

export type GeneralInfoParams = {
  latinName: string;
  persianName: string;
  accessLevel: string; // title
  categoryCode: number; // code
  version: string;
  ownerName: string;
  throughput: string; // title
  tagsIds: number[]; // codes
};

export type Service = {
  name: string;
  persianName: string;
  accessLevel: {
    code: number;
    title: string;
  };
  category: {
    code: number;
    title: string;
  };
  throughput: {
    code: number;
    title: string;
  };
  version: string;
  owner: string;
  tags: [
    {
      id: number;
      title: string;
    }
  ];
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
