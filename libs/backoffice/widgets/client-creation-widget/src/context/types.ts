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
  clientId?: number;
  ssoClientId?: number;
  clientEnglishName?: string;
  clientPersianName?: string;
  clientTypeCode?: number;
  clientTypeName?: string;
  clientKey?: string;
  authorizationKey?: string;
  websiteUrl?: string;
  inboundAddress?: string;
  redirectUrl?: string;
  isClientFlow?: boolean;
  isPasswordFlow?: boolean;
  isAuthorizationFlow?: boolean;
  isImplicitFlow?: boolean;
  isRefreshToken?: boolean;
  tagIds?: number[];
  organizationInfo: OrganizationInfo;
};
export type OrganizationInfo = {
  organizationId?: number;
  organizationName?: string;
  organizationNationalId?: string;
  isAggregator?: boolean;
  aggregatorId?: Nullable<number>;
  aggregatorName?: Nullable<string>;
  representative: Representative;
};

export type Representative = {
  nameAndLastName?: string;
  mobileNumber?: string;
  fixedPhoneNumber?: string;
  representativeType?: number;
};

export type WidgetStateType = {
  clientName?: string;
  clientStatus?: number;
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
      type: 'ADD_ORGANIZATION_INFO';
      payload: OrganizationInfo;
    }
  | {
      type: 'ADD_CLIENT_STATUS';
      payload: WidgetStateType['clientStatus'];
    }
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
