import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  searchField: Nullable<string>;
  sort: Nullable<string>;
  errorMessage: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchField'];
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    }
  | {
      type: 'UPDATE_ERROR_MESSAGE';
      payload: Nullable<MessageType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
