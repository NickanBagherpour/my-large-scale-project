import * as React from 'react';
import { FormFieldsType } from '../types';
import { ErrorMessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  errorMessage: Nullable<ErrorMessageType>;
  clientId: Nullable<string>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
      payload: Nullable<ErrorMessageType>;
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
      payload: PaginationType;
    }
  | {
      type: 'UPDATE_CLIENT_ID';
      payload: Nullable<string>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
