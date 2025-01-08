import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type PaginationType = {
  page: number;
  // size: number;
  rowsPerPage: number;
  sort: Nullable<string>;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  searchField: string;
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
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
