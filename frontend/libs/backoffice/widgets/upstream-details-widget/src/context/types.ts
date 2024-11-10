import * as React from 'react';
import { ModalFormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = ModalFormFieldsType;

export type SimpleFilters = Pick<ModalFormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  page: number;
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  errorMessage: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
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
      payload: PaginationType;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
