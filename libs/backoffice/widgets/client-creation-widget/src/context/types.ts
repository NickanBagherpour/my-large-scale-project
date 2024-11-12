import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
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
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SECOND_STEP_TABLE';
      payload: Partial<FiltersType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
