import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

//

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  serviceName?: string;
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
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
