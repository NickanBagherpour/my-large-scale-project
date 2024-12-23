import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  searchTerm: string;
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
      payload: WidgetStateType['searchTerm'];
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
