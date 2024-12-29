import { InquiryStatus } from '../utils/consts';

export type InquiryParams = {
  'service-name': string;
};
export type InquiryDto = {
  serviceName?: string;
  servicePersianName?: string;
  serviceProgress?: {
    statusCode?: number;
    statusTitle?: string;
    percent?: number;
    step?: number;
  };
  serviceInquiryStatus: {
    code: 1 | 2 | 3 | 4;
    title: string;
  };
  scope: {
    name?: string;
    description?: string;
    id?: number;
  };
};
export type InquiryInfo = Omit<InquiryDto, 'serviceInquiryStatus'> & {
  serviceInquiryStatus: {
    code: keyof typeof InquiryStatus;
    title?: string;
  };
};
