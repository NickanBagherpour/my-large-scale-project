import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  limit: number;
};
export type Tag = {
  label: string;
  key: string;
};

export type FirstStepType = {
  grant_tag?: any;
  tagIds?: any;
  ssoClientId?: string;
  clientEnglishName?: string;
  clientPersianName?: string;
  clientTypeCode?: number;
  clientKey?: string;
  authorizationKey?: string;
  websiteUrl?: string;
  inboundAddress?: string;
  redirectUrl?: string;
  organizationNationalId?: string;
};

export type WidgetStateType = {
  clientName?: string;
  firstStep: FirstStepType;
  secondStep: {
    table: FiltersType;
  };
  // table: {
  //   filters: FiltersType;
  //   pagination: PaginationType;
  //   submit: FiltersType;
  // };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'ADD_CLIENT_NAME';
      payload: WidgetStateType['clientName'];
    }
  | {
      type: 'UPDATE_FIRST_STEP_FORM';
      payload: WidgetStateType['firstStep'];
    }
  | {
      type: 'UPDATE_SECOND_STEP_TABLE';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
