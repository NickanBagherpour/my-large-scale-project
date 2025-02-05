import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';
import { ClientName } from '../types';

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  clientName: ClientName;
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
      type: 'UPDATE_CLIENT_NAME';
      payload: ClientName;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
