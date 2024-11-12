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
  grantTag?: Tag[];
  addTag?: Tag[];
  latinNameClient?: string;
  persianNameClient?: string;
  clientType?: string;
  clientId?: string;
  identityAuth?: string;
  websiteUrl?: string;
  inputAddress?: string;
  returnAddress?: string;
  aggregatorStatus?: boolean;
  aggregator?: string;
  userName?: string;
  nationalCode?: string;
  organizationName?: string;
  mobileNumber?: string;
  telephone?: string;
  email?: string;
};

export type WidgetStateType = {
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
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
