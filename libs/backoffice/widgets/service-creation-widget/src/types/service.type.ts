export type GeneralInfoParams = {
  latinName: string;
  persianName: string;
  accessLevel: {
    code: number;
    title: string;
  };
  categoryCode: number;
  version: string;
  ownerName: string;
  throughput: {
    code: number;
    title: string;
  };
  tagsIds: number[];
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

export type Tags = {
  id: number;
  title: string;
}[];

export type CodeTitle = {
  code: number;
  title: string;
};

export type ServiceInquiry = {
  serviceName: string;
  servicePersianName: string;
  serviceProgress?: {
    statusCode: number;
    statusTitle: string;
    percent: number;
    step: 1 | 2 | 3 | 4 | 5;
  };
  serviceInquiryStatus: { code: number; title: string };
  scope: {
    name: string;
    description: string;
    id: number;
  };
};
