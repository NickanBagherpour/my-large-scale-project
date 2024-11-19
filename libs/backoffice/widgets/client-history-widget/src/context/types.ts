import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';

import { ClientId } from '../types';

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  clientId: ClientId;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    }
  | {
      type: 'UPDATE_CLIENT_ID';
      payload: ClientId;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
