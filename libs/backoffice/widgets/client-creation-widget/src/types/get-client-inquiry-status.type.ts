import { Nullable } from '@oxygen/types';

interface ClientProgressType {
  statusCode: number;
  statusTitle: string;
  percent: number;
  step: number;
}

interface ClientInquiryStatusType {
  code: number;
  title: string;
}

interface Representative {
  nameAndLastName: string;
  mobileNumber: string;
  fixedPhoneNumber: string;
  representativeType: number;
}

interface OrganizationInfoType {
  organizationId: number;
  organizationName: string;
  organizationNationalId: string;
  isAggregator: boolean;
  aggregatorId: number;
  aggregatorName: string;
  representative: Representative;
}

export type InquiryStatusResponceType = {
  clientId: number;
  clientName: string;
  clientPersianName: string;
  clientProgress: ClientProgressType;
  clientInquiryStatus: ClientInquiryStatusType;
  organizationInfo: OrganizationInfoType;
};

export type InquiryStatusParamsType = {
  'client-name': Nullable<string>;
};
