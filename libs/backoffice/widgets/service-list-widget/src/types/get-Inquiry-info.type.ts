export type InquiryParams = {
  serviceName: string;
};
export type InquiryInfo = {
  status: 'SERVICE_ALREADY_EXISTS' | 'SERVICE_IS_DRAFT' | 'SERVICE_NOT_FOUND';
  serviceInquiryItem: {
    latinName: string;
    persianName: string;
    statusCode: number;
    statusProgressPercent: number;
    serviceInfoId: number;
    description: string;
  };
  scopes: [
    {
      id: number;
      title: string;
    }
  ];
};
