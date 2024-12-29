import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type WidgetStateType = {
  searchTerm: string;
  sort: string;
  status: number | null;
  pagination: {
    page: number;
    rowsPerPage: number;
  };
  message: Nullable<MessageType>;
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
      payload: WidgetStateType['pagination'];
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
