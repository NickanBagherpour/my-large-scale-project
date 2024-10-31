import * as React from 'react';
import { ErrorMessageType, Nullable } from '@oxygen/types';

export type WidgetStateType = {
  errorMessage: Nullable<ErrorMessageType>;
};

export type WidgetActionType = {
  type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
  payload: Nullable<ErrorMessageType>;
};

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
