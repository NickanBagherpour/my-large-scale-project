import * as React from 'react';
import { ErrorMessageType, Nullable } from '@oxygen/types';

export type Step = 0 | 1 | 2;

export type WidgetStateType = {
  step: Step;
  errorMessage: Nullable<ErrorMessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
      payload: Nullable<ErrorMessageType>;
    }
  | {
      type: 'UPDATE_STEP';
      payload: Step;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
