import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';
import { SORT_ORDER } from '../utils/consts';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  limit: number;
};

export enum SERVICE_MANAGEMENT_STATUS {
  ALL = 'All',
  NONCOMMERCIAL = 'Non-commercial',
  COMMERCIAL = 'Commercial',
}

export type WidgetStateType = {
  searchValue: Nullable<string>;
  status: SERVICE_MANAGEMENT_STATUS;
  sort: SORT_ORDER;
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SEARCH_VALUE';
      payload: WidgetStateType['searchValue'];
    }
  | {
      type: 'UPDATE_STATUS';
      payload: WidgetStateType['status'];
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
