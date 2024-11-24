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
  grant_tag?: any;
  add_tag?: any;
  latin_name_client?: string;
  persian_name_client?: string;
  client_type?: string;
  client_id?: string;
  identity_auth?: string;
  website_url?: string;
  input_address?: string;
  return_address?: string;
  aggregator_status?: boolean;
  aggregator?: string;
  user_uame?: string;
  national_code?: string;
  organization_name?: string;
  mobile_number?: string;
  telephone?: string;
  email?: string;
};

export type WidgetStateType = {
  firstStep: FirstStepType;
  secondStep: {
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
      type: 'UPDATE_SECOND_STEP_TABLE';
      payload: Partial<FiltersType>;
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
