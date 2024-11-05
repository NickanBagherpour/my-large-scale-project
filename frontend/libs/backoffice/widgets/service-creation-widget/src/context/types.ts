import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type Step = 0 | 1 | 2;

export type WidgetStateType = {
  step: Step;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_STEP';
      payload: Step;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
