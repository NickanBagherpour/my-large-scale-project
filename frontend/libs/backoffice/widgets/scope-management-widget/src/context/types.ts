import * as React from 'react';
import { ErrorMessageType, Nullable } from '@oxygen/types';

export type PaginationType = {
  page: number;
  limit: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  errorMessage: Nullable<ErrorMessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
      payload: Nullable<ErrorMessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
