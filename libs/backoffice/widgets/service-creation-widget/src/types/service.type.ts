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
  serviceInfoId: number;
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
  serviceInfoStatusCode: {
    code: number;
    title: string;
  };
  statusProgressPercent: number;
  serviceInfoDescription: string;
  isInSSO: boolean;
  isActive: boolean;
  isDeleted: boolean;
  tags: {
    id: number;
    title: string;
  }[];
  scopes:
    | {
        name: string;
        description: string;
        id: number;
      }[]
    | null;
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
