import { FiltersType, PaginationType } from '../context/types';

export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  page: number;
};

export type ReportResponseType = {
  responseId: number;
  serviceTypeCode: number;
  items: ItemType[];
  paginationResult: PaginationResultType;
};

export type FormFieldsType = any;

export type ItemType = {
  uid: number;
  count: number;
  amount: number;
  operationStatus: OperationStatusType;
};

export type OperationStatusType = {
  title: string;
  code: string;
};

export type PaginationResultType = {
  pageNumber: number;
  pageSize: number;
  totalNumberOfEntries: number;
};

export type FetchParamsType = {
  filters?: FiltersType;
  pagination: PaginationType;
};

export type FirstStepParams = {
  legal_person_name: string;
  legal_person_type: string;
  registration_number: string;
  registration_date: string;
  national_id: string;
  economy_code: string;
  activity_field: string;
  postal_code: string;
  phone: string;
  last_registration_address: string;
  organizationId?: string;
  submissionId?: string;
};

export type SecondStepParams = {
  submissionId: string;
  persian_name: string;
  mobile_number: string;
  phone_number: string;
  technical_persian_name: string;
  technical_mobile_number: string;
  technical_Phone_number: string;
  clientKey?: string;
};

export type ThirdStepParams = {
  requestId: string;
  servicesIdSet: [number];
};

export type RequestRegistration = {
  organization: string;
  submissionId: string;
};
