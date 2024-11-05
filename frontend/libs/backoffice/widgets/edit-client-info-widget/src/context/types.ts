import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  message: Nullable<MessageType>;
};

export type WidgetActionType = {
  type: 'UPDATE_GLOBAL_MESSAGE';
  payload: Nullable<MessageType>;
};

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
