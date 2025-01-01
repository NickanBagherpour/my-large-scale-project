import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  limit: number;
};

export type FirstStepType = {
  aggregator_status?: 'isAggregator' | 'hasAggregator' | 'nothing' | undefined;
  aggregator_value?: string;
  legal_person_name?: string;
  legal_person_type?: string;
  registration_number?: string;
  registration_date?: string;
  national_id?: string;
  economy_code?: string;
  activity_field?: string;
  postal_code?: string;
  phone?: string;
  last_registration_address?: string;
};

export type SecondStepType = {
  persian_name?: string;
  mobile_number?: string;
  phone_number?: string;
  technical_persian_name?: string;
  technical_mobile_number?: string;
  technical_Phone_number?: string;
  clientKey?: string;
};

export type RequestMode = 'selectOrganization' | 'registerOrganization';

export type WidgetStateType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'isAggregator' | 'hasAggregator' | 'nothing' | undefined;
  page: number;
  size: number;
  requestMode: RequestMode;
  organizationId: string;
  submissionId: string;
  firstStepDisabledSubmit: boolean;
  firstStep: FirstStepType;
  secondStep: SecondStepType;
  thirdStep: {
    table: FiltersType;
  };
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_FIRST_STEP_FORM';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_ORGANIZATION_ID_AND_SUBMISSION_ID';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_SECOND_STEP';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_THIRD_STEP_TABLE';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_THIRD_STEP_TABLE_AFTER_DELETE';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_REQUEST_MODE';
      payload: RequestMode;
    }
  | {
      type: 'UPDATE_STATUS';
      payload: WidgetStateType['status'];
    }
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_FILTERS';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_SUBMIT';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
