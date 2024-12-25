import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  pageSize: number;
};

export type WidgetStateType = {
  searchField: string;
  pagination: PaginationType;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchField'];
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
