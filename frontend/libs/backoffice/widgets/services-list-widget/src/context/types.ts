import * as React from 'react';
import { FormFieldsType } from '../types';
import { ErrorMessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  page: number;
  errorMessage: Nullable<ErrorMessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
      payload: Nullable<ErrorMessageType>;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchTerm'];
    }
  | {
      type: 'UPDATE_SORT';
      payload: WidgetStateType['sort'];
    }
  | {
      type: 'UPDATE_STATUS';
      payload: WidgetStateType['status'];
    }
  | {
      type: 'UPDATE_PAGINATION';
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
