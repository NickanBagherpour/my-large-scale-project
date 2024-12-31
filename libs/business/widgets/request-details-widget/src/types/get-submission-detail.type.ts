import { PaginationType } from '../context/types';
import { Nullable } from '@oxygen/types';

export type OperationStatusType = {
  title: string;
  code: string;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type FetchSubmissionDetailParamsType = {
  submissionId: SubmissionId;
};
export type FetchRequestedServicesParamsType = {
  // filters?: FiltersType;
  submissionId: SubmissionId;
  pagination: PaginationType;
};

export type PostSubmissionReviewParamsType = {
  submissionId: SubmissionId;
  expertOpinion: number;
  description: string;
};

export type SubmissionId = Nullable<string>;

export type CodeTitle = {
  code: number;
  title: string;
};

export enum RequestStatus {
  DRAFT = 1,
  UNDER_REVIEW_COMMERCIAL_BANK = 2,
  REJECTED_BY_COMMERCIAL_BANK,
  APPROVED_BY_COMMERCIAL_BANK,
  UNDER_REVIEW_BUSINESS_UNIT,
  REJECTED_BY_BUSINESS_UNIT,
  APPROVED_BY_BUSINESS_UNIT,
}

export enum UserRole {
  COMMERCIAL_BANKING_ADMIN = 'commercial-banking-admin',
  BUSINESS_ADMIN = 'business-admin',
}

export enum ExpertOpinionStatus {
  CONFIRMED = 1,
  REJECTED,
}
export type RequestConfirm = {
  description: string;
};

interface SubmissionInfoDto {
  requestId: number;
  clientName: string;
  organizationName: Nullable<string>;
  createDate: string;
  representativeName: string;
  submissionStatus: CodeTitle;
}

interface Organization {
  id: number;
  legalName: string;
  legalType: CodeTitle;
  registerNo: string;
  registerDate: string;
  organizationNationalId: string;
  economicCode: string;
  activityIndustry: string;
  postalCode: string;
  phone: string;
  registeredAddress: string;
  isAggregator: boolean;
  aggregatorId: Nullable<number>;
  aggregatorName: Nullable<string>;
}

interface Representative {
  name: string;
  mobileNumber: string;
  fixedPhone: string;
  type: number;
}

interface Service {
  id: number;
  name: string;
  persianName: string;
  fee: number;
  version: string;
}
export enum ExpertType {
  COMMERCIAL = 1,
  BUSINESS,
}

export interface Review {
  expertId: string;
  expertName: string;
  viewDate: string;
  expertDescription: string;
  expertOpinion: CodeTitle;
  expertType: ExpertType;
}
export interface SubmissionDetailType {
  submissionInfoDto: SubmissionInfoDto;
  organization: Organization;
  representativeSet: Representative[];
  services: Service[];
  reviews: Review[];
  isReviewed: boolean;
}
