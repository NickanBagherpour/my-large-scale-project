import { InquiryStatus } from '../utils/consts';

export interface InquiryParams {
  'service-name': string;
}
export interface InquiryDto {
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
}
export interface InquiryInfo extends Omit<InquiryDto, 'serviceInquiryStatus'> {
  serviceInquiryStatus: {
    code: keyof typeof InquiryStatus;
    title?: string;
  };
}
