import { ClientInquiryStatus, InquiryStatus, ServiceInquiryStatus } from './consts';

export type InquiryDto = ServiceInquiryDto | ClientInquiryDto;
export interface ClientInquiryDto {
  clientName: string;
  clientPersianName?: string;
  clientProgress?: {
    statusCode: number;
    statusTitle: string;
    percent: number;
    step: number;
  };
  clientInquiryStatus: {
    code: number;
    title: keyof typeof ClientInquiryStatus;
  };
  organizationInfo?: {
    organizationId?: number;
    organizationName?: string;
    organizationNationalId?: string;
    isAggregator?: true;
    aggregatorId?: number;
    aggregatorName?: string;
    representative?: {
      nameAndLastName?: string;
      mobileNumber?: string;
      fixedPhoneNumber?: string;
      representativeType?: number;
    };
  };
}
export interface ServiceInquiryDto {
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
    title: keyof typeof ServiceInquiryStatus;
  };
  scopes: {
    name: string;
    description?: string;
    id: number;
  }[];
}
// export type InquiryStatus = ServiceInquiryStatus | ClientInquiryStatus;
export type InquiryParams = {
  name: string;
};
export interface GeneralItemInfo {
  itemName: string;
  progress?: number;
}
export type InquiryType = 'service' | 'client';
export type ContentType = keyof typeof InquiryStatus;
