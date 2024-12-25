export type InquiryParams = {
  'service-name': string;
};
export type InquiryInfo = {
  serviceInquiryStatus: InquiryStatus;
  serviceGeneralInfo: {
    serviceInfoId: number;
    name: string;
    persianName: string;
    accessLevel: {
      code: number;
      title: 'PUBLIC';
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
    tags: [{ id: number; title: string }];
    scopes: [
      {
        name: string;
        description: string;
        id: number;
      }
    ];
  };
};
export type InquiryStatus =
  | 'SERVICE_ALREADY_EXISTS'
  | 'SERVICE_IS_DRAFT'
  | 'SERVICE_NOT_FOUND'
  | 'SERVICE_EXISTS_IN_BAAM';
