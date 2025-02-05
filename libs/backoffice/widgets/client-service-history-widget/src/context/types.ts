import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    pagination: {
      limit: number;
      page: number;
    };
  };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
